// ���C�t�Q�[��JavaFX��

import javafx.application.Application;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.control.*;  // Button etc.
import javafx.scene.layout.*;  // VBox, HBox 
import javafx.geometry.*;

public class LifeGameFX extends Application {
	@Override
	public void start(Stage stage) {
		//�����{�^���R���e�i
		Button b1 = new Button("���B�J�n");
		Button b2 = new Button("���B��~");
		Button b3 = new Button("�N���A");
		Label label = new Label("���ڏ�ŃN���b�N���邢�̓h���b�O���Đ�����u���A\n���B���J�n");
		HBox lowerPane = new HBox(); 
		lowerPane.setAlignment(Pos.CENTER);
		lowerPane.getChildren().addAll(b1, b2, b3, label);
		lowerPane.setPadding(new Insets(15, 10, 15, 10));
		lowerPane.setSpacing(20);
		//�㕔���x���R���e�i
		LifePaneNode anime = new LifePaneNode(); 
		HBox upperPane = new HBox();
		upperPane.setSpacing(20);  
		upperPane.setPadding(new Insets(15, 10, 15, 10)); 
		upperPane.getChildren().add(anime);
		upperPane.setAlignment(Pos.TOP_CENTER);
	
		VBox root = new VBox();
		root.getChildren().addAll(upperPane, lowerPane);
		Scene scene = new Scene(root);
		stage.setTitle("Life Game");
		b1.requestFocus();  //�ŏ��C�X�g�b�v�{�^���Ƀt�H�[�J�X�������i�I�����ꂽ��ԁj
		stage.setScene(scene);
		stage.sizeToScene();
		stage.show();

	    
		//�C�x���g�n���h���̐ݒ�
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