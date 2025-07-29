// ライフゲーム用ライフ
import javafx.scene.layout.*;  // Pane
import javafx.scene.canvas.*;  //Canvas, GraphicsContext
import javafx.scene.image.*; //Image
import javafx.animation.*;
import javafx.scene.paint.*; //Color
import javafx.scene.input.*; //MouseEvent
import javafx.scene.shape.*;  // Circle

public class LifeGameLife extends Circle {
	boolean lived = false;
	public LifeGameLife(){
		super();
	}
	
	public LifeGameLife(double centerX, double centerY, double radius){
		super(centerX, centerY, radius);
		setOnMouseClicked((event) -> { 
			if (!lived) {
				setFill(Color.RED);
				lived = true;
			} else {
				setFill(Color.BLACK);
				lived = false;
			}
		});
	}
}