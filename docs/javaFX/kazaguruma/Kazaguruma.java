/*
 * ����
 * ���L�[�ŉ�]�X�s�[�h���オ��A���L�[�ŉ�����
 */

import javafx.application.Application;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.layout.*;  //Pane
import javafx.scene.shape.*;  //Rectangle, Line, Circle
import javafx.scene.transform.*; //Rotate
import javafx.scene.paint.*;  //Color
import javafx.animation.*;
import javafx.scene.input.*; //event, KeyCode

public class Kazaguruma extends Application {
	Pane root;
	double w = 300;
	double h = 300;
	double s = 100;
	Rectangle r1, r2;
	double angle = 0;
	double da = 5;  //��]�ω��x��
	int dspeed = 5_000_000;   //�C���^�[�o���̕ω���
	int speed = 100_000_000; //0.1�b
	long prevTime;  //�O�̕`�掞��(�i�m�b)

	AnimationTimer timer;
	@Override
	public void start(Stage pstage) {
		root = new Pane();
		root.setPrefSize(w, h);
		root.setStyle("-fx-background-color: black;");
		makeShapes();
		Scene scene = new Scene(root);
		pstage.setTitle("Rotate rectangles");
		pstage.setScene(scene);
		pstage.show();

		timer = new AnimationTimer() { //�^�C�}�[�̐���
			@Override public void handle(long now){
				if (prevTime + speed > now) return;  //speed���o�߂��Ă��Ȃ���Ζ߂�
				prevTime = now;
				angle = (angle + da) % 360;
				r1.setRotate(angle);
				r2.setRotate(angle+45);

			}
		};
		timer.start();

		scene.setOnKeyPressed((e) -> {
			KeyCode c = e.getCode();
			if (c == KeyCode.UP ) {
				speed -= dspeed;
				speed = Math.max(10_000_000, speed);
			}else if (c == KeyCode.DOWN ) {
				speed += dspeed;
				speed = Math.min(500_000_000, speed);
			}
		});
		
	}

	void makeShapes() {
		double cx = w/2-s/2;
		double cy = h/2-s/2;
		r1 = new Rectangle(cx, cy, s, s);
		r2 = new Rectangle(cx, cy, s, s);
		r1.setStroke(Color.RED);
		r2.setStroke(Color.YELLOW);
		r1.setFill(Color.TRANSPARENT);
		r2.setFill(Color.TRANSPARENT);
		root.getChildren().addAll(r1, r2);
	}

	public static void main(String... args) {
		launch(args);
	}
}
