import javafx.application.Application;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.layout.*;  //Pane
import javafx.scene.shape.*;  // Circle
import javafx.scene.paint.*;  //Color
import javafx.scene.control.*;  //Button
import javafx.geometry.*;  //Pos

public class LifeGameFXShape extends Application {
	Pane root;
	@Override
	public void start(Stage stage) {
		//下部ボタンコンテナ
		Button b1 = new Button("増殖開始");
		Button b2 = new Button("増殖停止");
		Button b3 = new Button("クリア");
		Label label = new Label("桝目上でクリックして生命を置き、増殖を開始\n増殖中も生命を増やせる");
		HBox lowerPane = new HBox(); 
		lowerPane.setAlignment(Pos.CENTER);
		lowerPane.getChildren().addAll(b1, b2, b3, label);
		lowerPane.setPadding(new Insets(15, 10, 15, 10));
		lowerPane.setSpacing(20);
		//上部ラベルコンテナ
		LifePaneShape anime = new LifePaneShape(); 
		HBox upperPane = new HBox();
		upperPane.setSpacing(20);  
		upperPane.setPadding(new Insets(15, 10, 15, 10)); 
		upperPane.getChildren().add(anime);
		upperPane.setAlignment(Pos.TOP_CENTER);
		
		VBox root = new VBox();
		root.getChildren().addAll(upperPane, lowerPane);
		Scene scene = new Scene(root);
		stage.setTitle("Life Game");
		b1.requestFocus();  //最初，ストップボタンにフォーカスをおく（選択された状態）
		stage.setScene(scene);
		stage.sizeToScene();
		stage.show();
		
		
		//イベントハンドラの設定
		b1.setOnAction((event)-> {
			anime.timerOn = true;
			anime.timer.start();
		});
		
		b2.setOnAction((event) -> {
			anime.timerOn = false;
			anime.timer.stop();
		});
		
		b3.setOnAction((event) -> {
			anime.clearLife();
		});
		
	}
	
	public static void main(String... args) {
		launch(args);
	} 
}
