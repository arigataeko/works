// ライフゲーム用Paneサブクラス
import javafx.scene.layout.*;  // Pane
import javafx.scene.canvas.*;  //Canvas, GraphicsContext
import javafx.scene.image.*; //Image
import javafx.animation.*;
import javafx.scene.paint.*; //Color
import javafx.scene.input.*; //MouseEvent
import javafx.scene.shape.*;  // Circle

public class LifePaneShape extends Pane {
	Canvas canvas;
	long prevTime;        //前のフレームを描いた時間(ナノ秒)
	AnimationTimer timer; //タイマ
	boolean timerOn = false;

	int grid = 15;  //格子(生命)の大きさ
    int speed = 300_000_000; //0.3秒
    int width=500, height=500; //増殖フィールドの大きさ
	
	LifeGameLife life[][];
	LifeGameLife buf[][];

    int fI, fJ; //ドラッグ時の起点
	int sI, sJ; //ドラッグ時の終点
	boolean dragOn = false;  //ドラッグ後のmouseReleaseかを知るためのフラグ

	public LifePaneShape(){
		life = new LifeGameLife[height/grid][width/grid];
		buf = new LifeGameLife[height/grid][width/grid];
		
		for(int i=0; i<life.length; i++){
			for(int j=0; j<life[i].length; j++){
				life[i][j] = new LifeGameLife(10+i*grid, 10+j*grid, grid/2);
				getChildren().add(life[i][j]);
			}
		}
		timer = new AnimationTimer() { //タイマーの生成
			@Override public void handle(long now){
				if (prevTime + speed > now) return;  //0.3秒経過していなければ戻る
				prevTime = now;
				goLife();
			}
		};
	}
	void goLife(){ //生命活動をする
		for(int i=0; i<life.length; i++){  //現在のデータをコピー
			for(int j=0; j<life[i].length; j++){
				buf[i][j] = life[i][j];
			}
		}
		int count = 0;
		for(int i=0; i<life.length; i++){ 
			for(int j=0; j<life[i].length; j++){
				count = check_neighbor(i, j);
				//寂しいか，混んでいると死ぬ
				if(buf[i][j].lived && (count<=1 || count>=4)){ 
					life[i][j].lived=false;
					life[i][j].setFill(Color.BLACK);
				} 	//回りに3つあると生まれる
				else if(!buf[i][j].lived && count==3){ 
					life[i][j].lived=true;
					life[i][j].setFill(Color.RED);
				} 
				//System.out.println("i: " + i + " j: " + j + " count: " +count);
			}
		}
	}
	
	int check_neighbor(int n, int m){ //回りの生命の個数を数える
		int count = 0;
		for(int i=n-1; i<=n+1; i++){ 
			if(i<0 || i>=life.length) continue;
			for(int j=m-1; j<=m+1; j++){
				if(j<0 || (i==n && j==m) || j>=life[i].length) continue;
				if(buf[i][j].lived) count++;
			}
		}
		return count;
	}
	
	void clearLife(){
		timerOn = false;
		timer.stop();//stopLife();
		//データをclear
		for(int i=0; i<life.length; i++){
			for(int j=0; j<life[i].length; j++){
				life[i][j].lived =false;
				life[i][j].setFill(Color.BLACK);
			}
		}
	}

}