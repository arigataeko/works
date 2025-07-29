// ラケットボール
import javafx.application.Application;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.layout.*;  //Pane
import javafx.scene.canvas.*;  //Canvas, GraphicsContext
import javafx.animation.*;
import javafx.scene.paint.*; //Color

public class RacketBall extends Application {
	Canvas canvas;
	double w = 400;  // 画面サイズ
	double h = 400;
	double x = 0; // ボールX座標
	double y = 0;   // ボールY座標
	double diameter = 10.0; // ボール直径
	double speedX = 2; // ボールX軸速度
	double speedY = 2; // ボールY軸速度
	double directionX = 1; // ボールX軸移動向き
	double directionY = -1; // ボールY軸移動向き
	double racketW = 50, racketH = 20;  //ラケットの幅高さ
	double rx;  //ラケットの左からの位置
	double ry = h-50; //ラケットの上からの位置
	int point=0;
	double gh=10, gw=80;  //ゴールの幅高さ
	double gx = w/2-gw/2, gy=0;  //ゴールの位置
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
		timer = new AnimationTimer() { //タイマーの生成
			@Override public void handle(long now){
				drawCanvas();
			}
		};
		timer.start();   //アニメーションの開始
		canvas.setOnMouseMoved((event) -> { 
			rx = event.getX() - racketW/2;
		});
	
		canvas.setOnMouseClicked((event) -> { 
			if(gameover){
				gameover = false;
				x = 0;
				y = 0;
				point = 0;
				timer.start();   //アニメーションの開始
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
		gc.fillRect(0, 0, w, h);  // 背景塗る
		x += speedX * directionX;  // 座標計算
		y += speedY * directionY;
		if (x > w-diameter) {   // 右の壁
			x = w - diameter;
			directionX = -directionX; // x方向変換
			speedX = Math.random()*6+2;
			speedY = Math.random()*3+2;
		} else if (x < 0) { // 左の壁
			x = 0;
			directionX = -directionX; // x方向変換
			speedX = Math.random()*6+2;
			speedY = Math.random()*3+2;
		}
		if (y > ry-diameter && y < ry+20 &&  x > rx && x < rx+racketW) { //ラケット表面
			y = ry-diameter;
			directionY = -directionY; // y方向変換
			speedX = Math.random()*6+2;
			speedY = Math.random()*3+2;
		}else if (y > h-diameter) { //下の壁
			gameover = true;
		}else if (y < 0) {     // 上の壁
			if(x>gx && x<gx+gw) point=point +1; //ゴールに当たった
			y = 0;
			directionY = -directionY; // y方向変換
			speedX = Math.random()*6+2;
			speedY = Math.random()*3+2;
		}
		gc.setFill(Color.RED);
		gc.fillOval(x, y, diameter, diameter);   //円
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