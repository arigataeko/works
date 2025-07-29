// ���C�t�Q�[���pPane�T�u�N���X
import javafx.scene.layout.*;  // Pane
import javafx.scene.canvas.*;  //Canvas, GraphicsContext
import javafx.scene.image.*; //Image
import javafx.animation.*;
import javafx.scene.paint.*; //Color
import javafx.scene.input.*; //MouseEvent

class LifePaneNode extends Pane {
	Canvas canvas;
	long prevTime;        //�O�̃t���[����`��������(�i�m�b)
	AnimationTimer timer; //�^�C�}
	boolean timerOn = false;

    int grid = 10;  //�i�q�̑傫��
    int r =8;       //�����̑傫��
    int speed = 300_000_000; //0.3�b
    int width=500, height=500; //���B�t�B�[���h�̑傫��
 
    byte data[][];
    byte buf[][];
    Color mygreen;

    int fI, fJ; //�h���b�O���̋N�_
	int sI, sJ; //�h���b�O���̏I�_
	boolean dragOn = false;  //�h���b�O���mouseRelease����m�邽�߂̃t���O

	LifePaneNode(){
		canvas = new Canvas(width, height);
		getChildren().add(canvas);
		mygreen = Color.GREEN; //new Color(51,153, 51);
		data = new byte[height/grid][width/grid];
		buf = new byte[height/grid][width/grid];
		drawCanvas();

		timer = new AnimationTimer() { //�^�C�}�[�̐���
			@Override public void handle(long now){
				if (prevTime + speed > now) return;  //0.2�b�o�߂��Ă��Ȃ���Ζ߂�
				prevTime = now;
				goLife();
				drawCanvas(); //�`��
			}
		};

		canvas.setOnMouseClicked((MouseEvent event) -> {  //�}�E�X�N���b�N���̏���
			if (!timerOn) {
				double x, y;
				x = event.getX();
				y = event.getY();
				got:        //�ǂ̊i�q�̒����𒲂ׂ�
				for(int i=0; i<data.length; i++){
					for(int j=0; j<data[i].length; j++){
						if(x>=j*grid && x<=(j+1)*grid && y>=i*grid && y<=(i+1)*grid) {
							if(data[i][j]==1)data[i][j]=0;  //�����Ȃ����
							else data[i][j]=1;
							break got;                          
						}
					}
				}
				drawCanvas(); //�`��
			} //end of if
		});

		canvas.setOnMousePressed((MouseEvent event) -> {  //�}�E�X�v���X���̏���
			if (!timerOn) {
				double x, y;
				x = event.getX();
				y = event.getY();
				got:        //�v���X���ꂽ�_���ǂ̊i�q�̒����𒲂ׂ�
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
					data[sI][sJ] = 0; //�h���b�O��}�E�X�����[�X�����_��I�����邽��
									  //setOnMouseClicked���I������������̂�h��
					dragOn = false;
				}
			} //end of if
		});

		canvas.setOnMouseDragged((MouseEvent event) -> {  //�}�E�X�h���b�O���̏���
			if (!timerOn) {
				double x, y;
				x = event.getX();
				y = event.getY();

				got:        //�h���b�O���̓_���ǂ̊i�q�̒����𒲂ׂ�
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
				if(sJ<fJ){ //��փh���b�O J����
					j1=sJ; j2=fJ;
				}
				if(sI<fI){ //���փh���b�O I����
					i1=sI; i2=fI;
				}
				for(int i=i1; i<=i2; i++){
					for(int j=j1; j<=j2; j++){
						data[i][j]=1;
					}
				}
				drawCanvas(); //�`��
				dragOn = true;
			} //end of if
		});
	}

	void goLife(){ //��������������
		for(int i=0; i<data.length; i++){  //���݂̃f�[�^���R�s�[
			for(int j=0; j<data[i].length; j++){
				buf[i][j] = data[i][j];
			}
		}
		int count;
		for(int i=0; i<data.length; i++){ 
			for(int j=0; j<data[i].length; j++){
				count = check_neighbor(i, j);
				//�₵�����C����ł���Ǝ���
				if(buf[i][j]!=0 && (count<=1 || count>=4)){ data[i][j]=0;} 
				//����3����Ɛ��܂��
				else if(buf[i][j]==0 && count==3){ data[i][j]=1;} 
			}
		}
	}


	int check_neighbor(int n, int m){ //�Z���̉��̐����̌��𐔂���
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
		gc.clearRect(0, 0, width, height);  // �w�i�h��
		gc.setStroke(mygreen);
		//gc.setLineWidth(1);
		gc.strokeRect(0, 0, width, height);
		drawGoban(gc);        // line��`��

		gc.setFill(Color.BLACK);  // �����F 
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
		//�f�[�^��clear
		for(int i=0; i<data.length; i++){
			for(int j=0; j<data[i].length; j++){
				data[i][j]=0;
			}
		}
		drawCanvas();
	}

}