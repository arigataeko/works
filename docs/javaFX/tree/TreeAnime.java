// 木のフラクタル
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
	double scale = 0.7;  //枝の短くなる比率
	double angle = 30; //枝の広がり
	double len = 110;  //最初の枝の長さ
	int N = 8; //枝別れの段数
	AnimationTimer timer;
	long prevTime;        //前の木を描いた時間(ナノ秒)
    int speed = 500_000_000; //0.5秒
	int kaisu=N;

	@Override
    public void start(Stage pstage) {
		//下部スライドコンテナ
		//ComboBoxとボタンをのせる
		HBox lowerPane = new HBox(); 
		lowerPane.setAlignment(Pos.CENTER);
		lowerPane.setPadding(new Insets(15, 10, 15, 10));
		lowerPane.setSpacing(20);
		lowerPane.setStyle("-fx-background-color: white;");

		//角度
		lowerPane.getChildren().add(new Label("枝の角度"));
		ComboBox <String> cbAngle = new ComboBox<String>();
		for (int i=20; i<=90; i+=5) {    
			cbAngle.getItems().add(""+i); 
		}
		cbAngle.setValue(""+angle); //デフォルト値を選択しておく
		lowerPane.getChildren().add(cbAngle);

		//比率
		lowerPane.getChildren().add(new Label("枝の比率"));
		ComboBox <String> cbScale = new ComboBox<String>();
		for (double d=1.0; d>=0.5; d=d-0.05) { 
			cbScale.getItems().add(String.format("%.2f", d));
		}
		cbScale.setValue(String.format("%.2f", scale)); //デフォルト値を選択しておく
		lowerPane.getChildren().add(cbScale);  

		//成長回数
		lowerPane.getChildren().add(new Label("成長回数"));
		ComboBox <String> cbNum = new ComboBox<String>();
		for (int i=1; i<=20; i++) {  
			cbNum.getItems().add(""+i);
		}
		cbNum.setValue(""+N); //デフォルト値を選択しておく
		lowerPane.getChildren().add(cbNum);
		Button b = new Button("成長");
		lowerPane.getChildren().add(b);

		//上部コンテナ
		FlowPane upperPane = new FlowPane();
		upperPane.setAlignment(Pos.CENTER);
		canvas = new Canvas(W, H);
		upperPane.getChildren().add(canvas);
		upperPane.setStyle("-fx-background-color: #fff;");
		drawCanvas();
		//全体配置
		VBox root = new VBox();
		root.getChildren().addAll(upperPane, lowerPane);
		Scene scene = new Scene(root);
		pstage.setTitle("Growing a tree");
		pstage.setScene(scene);
		pstage.sizeToScene();
		pstage.show();
		
		//イベントハンドラの設定
		b.setOnAction((event)-> {   //成長ボタン
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

		timer = new AnimationTimer() { //タイマーの生成
			@Override public void handle(long now){
				if (prevTime + speed > now) return;  //speed分経過していなければ戻る
				prevTime = now;
				drawCanvas(); //描画
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
		drawTree(gc, W/2, H, len, 0, kaisu); //kaisuは徐々に増える
    }
	
	void drawTree(GraphicsContext gc, double x1, double y1, double len , double stand, int n){
		double x2= x1 + len*Math.sin(Math.toRadians(stand));  //枝先のx座標
		double y2= y1 - len*Math.cos(Math.toRadians(stand));
		gc.strokeLine(x1, y1, x2, y2);
		if (n > 1) {  
			drawTree(gc, x2, y2, len*scale, stand-angle, n-1); //次の左の枝を描く
			drawTree(gc, x2, y2, len*scale, stand+angle, n-1); //次の右の枝を描く
		}
	}

	public static void main(String... args) {
		launch(args);
	} 
}