/*
 * �O�R�������Q�[��
 */
import javafx.application.Application;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.control.*;  // Button etc.
import javafx.scene.layout.*;  // VBox, HBox 
import javafx.scene.paint.*; //Color
import javafx.scene.canvas.*;  //Canvas, GraphicsContext
import javafx.geometry.*;   //  Pos
import javafx.scene.input.*; //MouseEvent
import java.awt.Toolkit;

//��ʃR���g���[���p�̃N���X
public class Bargame extends Application {

    Button doB, newB, cancelB; //����p�{�^��
    Yama ba;
//    BarPlay listener; 
//    Container content;
    private int state[][];     //���[�N�p 0:�Ȃ��A1:����A2:�`�F�b�N�� 3:���m���Ԃ̑I��
    private int can[][];     //�I���ł���_�̃��X�g
							//can[][0]:�ǂ̎R��(0,1,2), can[][1]���Ԗڂ̖_��
    private int canNum;        //�I���ł���_�̐�
    private int cnt[] = new int[] {0,0,0,0};    // �o�C�i���f�[�^�̂P�̌�
    private boolean first = true; // �ŏ��̑I����҂��
    private byte over = 0; // �O�F�Q�[���� �P�F�R���s���[�^���� �Q�F�l�ԏ���

    //public void init() {           //���������\�b�h
	@Override
    public void start(Stage pstage) {
		//�{�^�����̂���
		HBox lowerPane = new HBox(); 
		lowerPane.setAlignment(Pos.CENTER);
		lowerPane.setPadding(new Insets(15, 10, 15, 10));
		lowerPane.setSpacing(20);
		lowerPane.setStyle("-fx-background-color: white;");
		doB = new Button("�_�̑I���I��");
		lowerPane.getChildren().add(doB);

		cancelB = new Button("�_�̑I����蒼��");    //
		lowerPane.getChildren().add(cancelB);

		newB = new Button("�Q�[���̊J�n");
		lowerPane.getChildren().add(newB);

		//�㕔�R���e�i
		FlowPane upperPane = new FlowPane();
		upperPane.setAlignment(Pos.CENTER);
		upperPane.setStyle("-fx-background-color: #fff;");
		//canvas = new Canvas(W, H);
		
		//�R�I�u�W�F�N�g�𐶐�
		ba = new Yama();
		upperPane.getChildren().add(ba);
		state = new int[3][Yama.N];
		can = new int[6][2];     //�I���ł���_�̃��X�g
		turnClear();
		//�S�̔z�u
		VBox root = new VBox();
		root.getChildren().addAll(upperPane, lowerPane);
		Scene scene = new Scene(root);
		pstage.setTitle("Mitsuyama kuzushi");
		pstage.setScene(scene);
		pstage.sizeToScene();
		pstage.show();

//       ba.debugPrint();

		//�C�x���g�n���h���̐ݒ�
		doB.setOnAction((event)-> {   //�_�̑I���I���{�^��
			if(first) return;          //�܂��I������Ă��Ȃ�
			donePlay();                //�l�Ԃ̎�𔽉f�A�R���s���[�^�����
//          ba.debugPrint();			
			afterButtonClicked();
		});

		cancelB.setOnAction((event)-> {   //�_�̑I����蒼���{�^��
			for (int i=0; i<3; i++){
				for (int j=0; j<Yama.N; j++)
					if(ba.state[i][j] == 3) { ba.state[i][j] = 1; }
			}
			afterButtonClicked();			
		});

		newB.setOnAction((event)-> {   //�Q�[���̊J�n�{�^��
			ba.initState();
			over = 0;
			afterButtonClicked();
		});

		ba.setOnMousePressed((MouseEvent e) -> {  //�}�E�X�v���X���̏���
			double ex = e.getX();           // �C�x���g�̋N�������ʒu
			double ey = e.getY();
			int bx = Yama.bx;     
			int by = Yama.by;
			int ci=0, cj=0;                  // �N���b�N���ꂽ�_�̈ʒu

			if (over != 0) return;
			if (ex>=bx && ex<bx+Yama.N*20 && ey>=by && ey<by+3*60){
			  for (int i=0; i<3; i++){
				for(int j=0; j<Yama.N; j++){
					if(ex>=bx+j*20 && ex<bx+(j+1)*20){
						cj = j;
						break;
					}
				}
				if(ey>=by+i*60 && ey<by+(i+1)*60){
					ci = i;
					break;
				}
			  }
			//System.out.println("BAR (" + ci +","+ cj + ")");
			  if (checkSelect(ci,cj)){
				state[ci][cj] = 2;
				ba.state[ci][cj] = 3;  //�I�����������m����
				ba.drawYama();  //�I�������_�̐F��ς���
				okSelect(ci,cj);  // �N���b�N�ł���_�̃��X�g�����
			  }else{
				Toolkit.getDefaultToolkit().beep();
				return;
			  }
			}  //end of if
		});
	}


		public void afterButtonClicked(){
			ba.over=over;
			ba.drawYama();
			turnClear();
		}

    //�l�Ԃ̎�𔽉f�A��������A�R���s���[�^�������̎�����߁A���s����B
    private void donePlay(){
       for (int i=0; i<3; i++){
          for (int j=0; j<Yama.N; j++)
            ba.state[i][j] = state[i][j];
       }
       ba.count();
       ba.setBinary();

       if (winPlay()){
         over = 1;  // �R���s���[�^�̏��� (�ЂƂ̎R�����ɖ_������)

         return;
       }

       compPlay();

       if (winPlay()){
         over = 2;  // �l�Ԃ̏��� �I��
         return;
       }
    }

    // �N���b�N���ꂽ�_���������ǂ������ׂ�
    private boolean checkSelect(int ci, int cj){
       for (int i=0; i<canNum; i++){
          if (can[i][0] == ci && can[i][1] == cj) {
              first = false;
              return true;
          }
       }
       return false;
    }

    // �l�Ԃ̎育�ƂɃ��[�N�ϐ����N���A
    private void turnClear(){
       for (int i=0; i<3; i++){
          for (int j=0; j<Yama.N; j++)
            state[i][j] = ba.state[i][j];
       }
       first = true;
       okSelect(0,0);
     }

     // �N���b�N�ł���_�̃��X�g�����
     private void okSelect(int ci, int cj){
       int m=0, j; 
       if (first){ // ���߂Ă̑I��
          for (int i=0; i<3; i++){ 
              if (ba.kazu[i][1] == 0) continue;  //���̎R�ɖ_�͂Ȃ�
              for (j=0; j<ba.kazu[i][0]; j++){
                  if (state[i][j] == 1){
                     can[m][0] = i;
                     can[m++][1] = j;
                     break;
                  }
              }
              for (j=ba.kazu[i][0]-1; j>=0; j--){
                  if (state[i][j] == 1){
                     can[m][0] = i;
                     can[m++][1] = j;
                     break;
                  }
              }
          }
          canNum = m;
       }
       else {
          can[0][0] = ci;
          canNum = 1;
          if (cj < Yama.N && state[ci][cj+1] == 1) can[0][1] = cj+1;
          else if (cj > 0 && state[ci][cj-1] == 1) can[0][1] = cj-1;
          else canNum = 0;
       }
    }

    // �R���s���[�^�̎�
    private void compPlay(){
       if (!checkSafe(ba.binary)) { // safe�łȂ���ԂȂ�K���ɂP�{����
          noThinkPlay();
       }
       else{
         thinkPlay();
       }
       ba.setBinary();
       ba.count();

    }

    private void thinkPlay(){       
       char binary[][] = new char[3][Yama.B];
       int changed = 0;
       int i, j;

       for (i=0; i<3; i++){
          for (j=0; j<Yama.B; j++)
            binary[i][j] = ba.binary[i][j];
       }

       if ((j=isOneCnt()) != 9) { //��̗�͂P���� 9�́u�o�C�i����1�̐�����̗񂪕����v�̈Ӗ�
          for(i=0; i<3; i++){
             if (binary[i][j] == '1'){
                changed = i;
                binary[i][j] = '0';
             }
          }
       }
       else {  // ��̗񂪕�������
           // ������P����̗��T��
              changed = leftOneCnt(binary);
              int tmp = ba.kazu[changed][1];


           // �o�C�i���̂P�̐��������ɂȂ�悤�ɁAchanged�̍s�𑀍�
           do{
               tmp = changeBinary(binary, tmp, changed);
           } while(checkSafe(binary));
        }

        
        // �ύX�����o�C�i����������_�̖{���𒲂ׂ�
        String str = new String(binary[changed]); 
        int newKazu = Integer.parseInt(str, 2);  // �V�����_�̖{��
        int sa = ba.kazu[changed][1] - newKazu;
        ba.kazu[changed][1] = newKazu;

        for (j=0; j<ba.kazu[changed][0] && sa>0; j++){ 
                                      // �_�����̖{����������
           if (ba.state[changed][j] == 1){
                 ba.state[changed][j] = 2;
                 sa--;
              }
         }
   }


   // 1�̐�����ł���񂪂P�����Ȃ炻�̗�̓Y����Ԃ��A
   // �����łȂ���΂X��Ԃ��B
   private int isOneCnt(){
      int num = 0, one = 0;
  
      for (int j=0; j<Yama.B && num<2; j++){
        if (cnt[j]%2 != 0) {
           num++;
           one = j;
        }
      }
      if (num == 1) return one;
      else return 9;
   }
      
   // ��ԍ���1�̐�����ł����ɂP������s��T���A�Ԃ�
   private int leftOneCnt(char binary[][]){
      int j;
      for (j=0; j<Yama.B; j++){
        if (cnt[j]%2 != 0) {
           break;
        }
      }
      for (int i=0; i<3; i++){
         if (binary[i][j] == '1') return i;
      }
     return -1; // error
   }
      
   // �R����P�{�_����菜���A���̃o�C�i�����Z�b�g
   private int changeBinary(char binary[][], int kazu, int row){
      int tmpkazu, len;
      String tmpstr;


      tmpkazu = kazu - 1;
      tmpstr = Integer.toBinaryString(tmpkazu);
      len = tmpstr.length();
      for (int j=len-1; j>=0; j--){
          if (tmpstr.charAt(j) == '1')
             binary[row][j+Yama.B-len] = '1';
          else
             binary[row][j+Yama.B-len] = '0';
      }
      for (int m=0; m<Yama.B-len; m++)
          binary[row][m] = '0';

      return tmpkazu;

   }

   // safe�ȏ�ԂȂ�true���A�����łȂ��Ȃ�false��Ԃ��B
   private boolean checkSafe(char bin[][]){

      int i=0,j;
      for (j=0; j<Yama.B; j++){       // �o�C�i���f�[�^�̂P�̐��𐔂���
         cnt[j] = 0;
         for (i=0; i<3; i++){
            if(bin[i][j] == '1') cnt[j]++;
         }
      }
      for (j=0; j<Yama.B; j++){
         if ( cnt[j]%2 != 0 )
             return true;
      }
      return false;
   }

   // safe�ȏ�Ԃ̎��̎�B�K���ɂP�{����
   private void noThinkPlay(){
      for (int i=0; i<3; i++){
         if (ba.kazu[i][1] != 0){
             for (int j=0; j<ba.kazu[i][1]; j++){ 
                if (ba.state[i][j] == 1){
                    ba.state[i][j] = 2;
                    ba.kazu[i][1]--;
                   // ba.delBar(i,j);
					ba.drawYama();
                    return;
                }
              }
          }
      }

   }


   // ���s�𒲂ׂ�
   private boolean winPlay(){
      for (int i=0; i<3; i++){
         if (ba.kazu[i][1] >= 1 && ba.kazu[(i+1)%3][1] == 0 
                                      && ba.kazu[(i+2)%3][1] == 0 ) 
             return true;
      }
      return false;   
   }

	public static void main(String... args) {
		launch(args);
	} 
  }
