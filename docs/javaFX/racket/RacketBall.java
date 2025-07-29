// ���P�b�g�{�[��
import javafx.application.Application;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.layout.*;  //Pane
import javafx.scene.canvas.*;  //Canvas, GraphicsContext
import javafx.animation.*;
import javafx.scene.paint.*; //Color

public class RacketBall extends Application {
	Canvas canvas;
	double w = 400;  // ��ʃT�C�Y
	double h = 400;
	double x = 0; // �{�[��X���W
	double y = 0;   // �{�[��Y���W
	double diameter = 10.0; // �{�[�����a
	double speedX = 2; // �{�[��X�����x
	double speedY = 2; // �{�[��Y�����x
	double directionX = 1; // �{�[��X���ړ�����
	double directionY = -1; // �{�[��Y���ړ�����
	double racketW = 50, racketH = 20;  //���P�b�g�̕�����
	double rx;  //���P�b�g�̍�����̈ʒu
	double ry = h-50; //���P�b�g�̏ォ��̈ʒu
	int point=0;
	double gh=10, gw=80;  //�S�[���̕�����
	double gx = w/2-gw/2, gy=0;  //�S�[���̈ʒu
	boolean gameover = false;
	AnimationTimer timer;

	@Override
	public void start(Stage pstage) {
		Pane root = new Pane();
		canvas = new Canvas(w, h);
		root.getChildren().add(canvas);
		Scene scene = new Scene(root);
		pstage.setTitle("Racket Ball");
		pstage.setScene(scene);
		pstage.show();
		timer = new AnimationTimer() { //�^�C�}�[�̐���
			@Override public void handle(long now){
				drawCanvas();
			}
		};
		timer.start();   //�A�j���[�V�����̊J�n
		canvas.setOnMouseMoved((event) -> { 
			rx = event.getX() - racketW/2;
		});
	
		canvas.setOnMouseClicked((event) -> { 
			if(gameover){
				gameover = false;
				x = 0;
				y = 0;
				point = 0;
				timer.start();   //�A�j���[�V�����̊J�n
			}
		});
    }

	void drawCanvas() {
		GraphicsContext gc = canvas.getGraphicsContext2D();
		if(gameover){
			timer.stop();
			gc.strokeText("Game over",w/2-40, h/2); 
	 	 return;
		}
		gc.setFill(Color.WHITE);
		gc.fillRect(0, 0, w, h);  // �w�i�h��
		x += speedX * directionX;  // ���W�v�Z
		y += speedY * directionY;
		if (x > w-diameter) {   // �E�̕�
			x = w - diameter;
			directionX = -directionX; // x�����ϊ�
			speedX = Math.random()*6+2;
			speedY = Math.random()*3+2;
		} else if (x < 0) { // ���̕�
			x = 0;
			directionX = -directionX; // x�����ϊ�
			speedX = Math.random()*6+2;
			speedY = Math.random()*3+2;
		}
		if (y > ry-diameter && y < ry+20 &&  x > rx && x < rx+racketW) { //���P�b�g�\��
			y = ry-diameter;
			directionY = -directionY; // y�����ϊ�
			speedX = Math.random()*6+2;
			speedY = Math.random()*3+2;
		}else if (y > h-diameter) { //���̕�
			gameover = true;
		}else if (y < 0) {     // ��̕�
			if(x>gx && x<gx+gw) point=point +1; //�S�[���ɓ�������
			y = 0;
			directionY = -directionY; // y�����ϊ�
			speedX = Math.random()*6+2;
			speedY = Math.random()*3+2;
		}
		gc.setFill(Color.RED);
		gc.fillOval(x, y, diameter, diameter);   //�~
		gc.strokeText("Point: " + point, 10, 30);
		gc.setFill(Color.DARKGREY);
		gc.fillRect(gx, gy, gw, gh);      //goal
		gc.setFill(Color.DODGERBLUE);
		gc.fillRect(rx, ry, racketW, racketH); //racket
	}

	public static void main(String... args) {
		launch(args);
    } 
}