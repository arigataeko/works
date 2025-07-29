// ライフゲーム用Paneサブクラス
import javafx.scene.layout.*;  // Pane
import javafx.scene.canvas.*;  //Canvas, GraphicsContext
import javafx.scene.image.*; //Image
import javafx.animation.*;
import javafx.scene.paint.*; //Color
import javafx.scene.input.*; //MouseEvent

class LifePaneNode extends Pane {
	Canvas canvas;
	long prevTime;        //前のフレームを描いた時間(ナノ秒)
	AnimationTimer timer; //タイマ
	boolean timerOn = false;

    int grid = 10;  //格子の大きさ
    int r =8;       //生命の大きさ
    int speed = 300_000_000; //0.3秒
    int width=500, height=500; //増殖フィールドの大きさ
 
    byte data[][];
    byte buf[][];
    Color mygreen;

    int fI, fJ; //ドラッグ時の起点
	int sI, sJ; //ドラッグ時の終点
	boolean dragOn = false;  //ドラッグ後のmouseReleaseかを知るためのフラグ

	LifePaneNode(){
		canvas = new Canvas(width, height);
		getChildren().add(canvas);
		mygreen = Color.GREEN; //new Color(51,153, 51);
		data = new byte[height/grid][width/grid];
		buf = new byte[height/grid][width/grid];
		drawCanvas();

		timer = new AnimationTimer() { //タイマーの生成
			@Override public void handle(long now){
				if (prevTime + speed > now) return;  //0.2秒経過していなければ戻る
				prevTime = now;
				goLife();
				drawCanvas(); //描画
			}
		};

		canvas.setOnMouseClicked((MouseEvent event) -> {  //マウスクリック時の処理
			if (!timerOn) {
				double x, y;
				x = event.getX();
				y = event.getY();
				got:        //どの格子の中かを調べる
				for(int i=0; i<data.length; i++){
					for(int j=0; j<data[i].length; j++){
						if(x>=j*grid && x<=(j+1)*grid && y>=i*grid && y<=(i+1)*grid) {
							if(data[i][j]==1)data[i][j]=0;  //既存なら消す
							else data[i][j]=1;
							break got;                          
						}
					}
				}
				drawCanvas(); //描画
			} //end of if
		});

		canvas.setOnMousePressed((MouseEvent event) -> {  //マウスプレス時の処理
			if (!timerOn) {
				double x, y;
				x = event.getX();
				y = event.getY();
				got:        //プレスされた点がどの格子の中かを調べる
				for(int i=0; i<data.length; i++){
					for(int j=0; j<data[i].length; j++){
						if(x>=j*grid && x<=(j+1)*grid &&
							 y>=i*grid && y<=(i+1)*grid) {
							fI = i;
							fJ = j;
							break got;                          
						}
					}
				}
			} //end of if
		});

		canvas.setOnMouseReleased((MouseEvent event) -> {
			if (!timerOn) {
				if(dragOn){
					data[sI][sJ] = 0; //ドラッグ後マウスリリースした点を選択するため
									  //setOnMouseClickedが選択を解除するのを防ぐ
					dragOn = false;
				}
			} //end of if
		});

		canvas.setOnMouseDragged((MouseEvent event) -> {  //マウスドラッグ時の処理
			if (!timerOn) {
				double x, y;
				x = event.getX();
				y = event.getY();

				got:        //ドラッグ中の点がどの格子の中かを調べる
				for(int i=0; i<data.length; i++){
					for(int j=0; j<data[i].length; j++){
						if(x>=j*grid && x<=(j+1)*grid && y>=i*grid && y<=(i+1)*grid) {
							sI = i;
							sJ = j;
							break got;                          
						}
					}
				}
				int i1=fI, i2=sI;
				int j1=fJ, j2=sJ;
				if(sJ<fJ){ //上へドラッグ J交換
					j1=sJ; j2=fJ;
				}
				if(sI<fI){ //左へドラッグ I交換
					i1=sI; i2=fI;
				}
				for(int i=i1; i<=i2; i++){
					for(int j=j1; j<=j2; j++){
						data[i][j]=1;
					}
				}
				drawCanvas(); //描画
				dragOn = true;
			} //end of if
		});
	}

	void goLife(){ //生命活動をする
		for(int i=0; i<data.length; i++){  //現在のデータをコピー
			for(int j=0; j<data[i].length; j++){
				buf[i][j] = data[i][j];
			}
		}
		int count;
		for(int i=0; i<data.length; i++){ 
			for(int j=0; j<data[i].length; j++){
				count = check_neighbor(i, j);
				//寂しいか，混んでいると死ぬ
				if(buf[i][j]!=0 && (count<=1 || count>=4)){ data[i][j]=0;} 
				//回りに3つあると生まれる
				else if(buf[i][j]==0 && count==3){ data[i][j]=1;} 
			}
		}
	}


	int check_neighbor(int n, int m){ //セルの回りの生命の個数を数える
		int count = 0;
		for(int i=n-1; i<=n+1; i++){ 
			if(i<0 || i>=data.length) continue;
			for(int j=m-1; j<=m+1; j++){
				if(j<0 || (i==n && j==m) || j>=data[i].length) continue;
				if(buf[i][j]!=0) count++;
			}
		}
		return count;
	}

	void drawCanvas() {
		GraphicsContext gc = canvas.getGraphicsContext2D();
		gc.clearRect(0, 0, width, height);  // 背景塗る
		gc.setStroke(mygreen);
		//gc.setLineWidth(1);
		gc.strokeRect(0, 0, width, height);
		drawGoban(gc);        // lineを描く

		gc.setFill(Color.BLACK);  // 生命色 
		drawLife(gc);
    }

	void drawLife(GraphicsContext g){
		int x, y;
		for(int i=0; i<data.length; i++){
			for(int j=0; j<data[i].length; j++){
				if(data[i][j] == 1){
					x=j*grid+1;
					y=i*grid+1;
					g.fillOval(x, y, r, r);
				}
			}
		}
	 }

	void drawGoban(GraphicsContext g){
		for(int i=1; i<height/grid;i++){
			g.strokeLine(0,i*grid,width,i*grid);
		}
		for(int i=1; i<width/grid;i++){
			g.strokeLine(i*grid,0,i*grid,height);
		}
	} 

	void clearLife(){
		timerOn = false;
		timer.stop();//stopLife();
		//データをclear
		for(int i=0; i<data.length; i++){
			for(int j=0; j<data[i].length; j++){
				data[i][j]=0;
			}
		}
		drawCanvas();
	}

}