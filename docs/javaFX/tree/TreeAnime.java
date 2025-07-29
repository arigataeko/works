// �؂̃t���N�^��
import javafx.application.Application;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.control.*;   // Button, Slider etc.
import javafx.scene.layout.*;  // VBox, HBox 
import javafx.scene.paint.*; //Color
import javafx.scene.canvas.*;  //Canvas, GraphicsContext
import javafx.geometry.*;   //  Pos
import javafx.animation.*;

public class TreeAnime extends Application {
	Canvas canvas;
	final double W = 525, H = 400;
	double scale = 0.7;  //�}�̒Z���Ȃ�䗦
	double angle = 30; //�}�̍L����
	double len = 110;  //�ŏ��̎}�̒���
	int N = 8; //�}�ʂ�̒i��
	AnimationTimer timer;
	long prevTime;        //�O�̖؂�`��������(�i�m�b)
    int speed = 500_000_000; //0.5�b
	int kaisu=N;

	@Override
    public void start(Stage pstage) {
		//�����X���C�h�R���e�i
		//ComboBox�ƃ{�^�����̂���
		HBox lowerPane = new HBox(); 
		lowerPane.setAlignment(Pos.CENTER);
		lowerPane.setPadding(new Insets(15, 10, 15, 10));
		lowerPane.setSpacing(20);
		lowerPane.setStyle("-fx-background-color: white;");

		//�p�x
		lowerPane.getChildren().add(new Label("�}�̊p�x"));
		ComboBox <String> cbAngle = new ComboBox<String>();
		for (int i=20; i<=90; i+=5) {    
			cbAngle.getItems().add(""+i); 
		}
		cbAngle.setValue(""+angle); //�f�t�H���g�l��I�����Ă���
		lowerPane.getChildren().add(cbAngle);

		//�䗦
		lowerPane.getChildren().add(new Label("�}�̔䗦"));
		ComboBox <String> cbScale = new ComboBox<String>();
		for (double d=1.0; d>=0.5; d=d-0.05) { 
			cbScale.getItems().add(String.format("%.2f", d));
		}
		cbScale.setValue(String.format("%.2f", scale)); //�f�t�H���g�l��I�����Ă���
		lowerPane.getChildren().add(cbScale);  

		//������
		lowerPane.getChildren().add(new Label("������"));
		ComboBox <String> cbNum = new ComboBox<String>();
		for (int i=1; i<=20; i++) {  
			cbNum.getItems().add(""+i);
		}
		cbNum.setValue(""+N); //�f�t�H���g�l��I�����Ă���
		lowerPane.getChildren().add(cbNum);
		Button b = new Button("����");
		lowerPane.getChildren().add(b);

		//�㕔�R���e�i
		FlowPane upperPane = new FlowPane();
		upperPane.setAlignment(Pos.CENTER);
		canvas = new Canvas(W, H);
		upperPane.getChildren().add(canvas);
		upperPane.setStyle("-fx-background-color: #fff;");
		drawCanvas();
		//�S�̔z�u
		VBox root = new VBox();
		root.getChildren().addAll(upperPane, lowerPane);
		Scene scene = new Scene(root);
		pstage.setTitle("Growing a tree");
		pstage.setScene(scene);
		pstage.sizeToScene();
		pstage.show();
		
		//�C�x���g�n���h���̐ݒ�
		b.setOnAction((event)-> {   //�����{�^��
			kaisu = 1;
			timer.start();	
		});
	
		cbAngle.setOnAction( (event)-> {
			angle = Double.parseDouble(cbAngle.getSelectionModel().getSelectedItem());
		});
		cbScale.setOnAction( (event)-> {
			scale = Double.parseDouble(cbScale.getSelectionModel().getSelectedItem());
		});
		cbNum.setOnAction( (event)-> {
			N = Integer.parseInt(cbNum.getSelectionModel().getSelectedItem());
		});

		timer = new AnimationTimer() { //�^�C�}�[�̐���
			@Override public void handle(long now){
				if (prevTime + speed > now) return;  //speed���o�߂��Ă��Ȃ���Ζ߂�
				prevTime = now;
				drawCanvas(); //�`��
				if(kaisu>=N) {
					kaisu=1;
					timer.stop();
				}else {
					kaisu++;
				}
			}
		};
	}

	void drawCanvas() {
		GraphicsContext gc = canvas.getGraphicsContext2D();
		gc.setStroke(Color.rgb(100, 153, 0, 1));
		gc.setFill(Color.WHITE);
		gc.fillRect(0, 0, W, H);
		//drawTree(gc, W/2, H, len, 0, N);
		drawTree(gc, W/2, H, len, 0, kaisu); //kaisu�͏��X�ɑ�����
    }
	
	void drawTree(GraphicsContext gc, double x1, double y1, double len , double stand, int n){
		double x2= x1 + len*Math.sin(Math.toRadians(stand));  //�}���x���W
		double y2= y1 - len*Math.cos(Math.toRadians(stand));
		gc.strokeLine(x1, y1, x2, y2);
		if (n > 1) {  
			drawTree(gc, x2, y2, len*scale, stand-angle, n-1); //���̍��̎}��`��
			drawTree(gc, x2, y2, len*scale, stand+angle, n-1); //���̉E�̎}��`��
		}
	}

	public static void main(String... args) {
		launch(args);
	} 
}