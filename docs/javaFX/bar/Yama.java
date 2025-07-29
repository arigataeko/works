/*
 * �O�R�������Q�[��
 */
import javafx.scene.image.*; //Image
import javafx.scene.canvas.*;  //Canvas, GraphicsContext
import javafx.scene.paint.*; //Color
import javafx.scene.text.Font;  
 

//yama�̃N���X
public class Yama extends Canvas{
   static final int N = 15;    // �ő�̖_�̐�
   static final int B = 4;     // �o�C�i���\�������Ƃ��̌���

   int state[][];      // �_�����邩�Ȃ��� 0:�Ȃ��A1:����A2:�`�F�b�N��
   int kazu[][];       // �_�̍ŏ��̐�(kazu[][0])�ƌ��݂̐�(kazu[][1])
   char binary[][];      // �o�C�i���\��
   byte over = 0; // �O�F�Q�[���� �P�F�R���s���[�^���� �Q�F�l�ԏ���
   Image barImg, checkImg, delImg;
   static final int bx=20, by=100;
   double w = 400;
   double h = 400;

   // �R���X�g���N�^
   Yama(){
       super(400, 400);
       state = new int[3][N];      
       kazu = new int[3][2];      
       binary = new char[3][B];      

       //�_�̉摜
       barImg = new Image(getClass().getResourceAsStream("/bar.gif"));
       checkImg = new Image(getClass().getResourceAsStream("/check.gif"));
       delImg = new Image(getClass().getResourceAsStream("/del.gif"));

       initState();        // �_�̏����ݒ�
       drawYama();
   }

   // �������g���Ė_�̐������߂�B�R�ȉ��ɂ͂R��������
   // �_�̐�����Astate�̒l�������ݒ�
   void initState(){
        int tmp, k;
        for (int i=0; i<3; i++){
           kazu[i][0] = ((tmp = (int)(Math.random()*N)) < 3) ? tmp+3 : tmp;
           kazu[i][1] = kazu[i][0];
           for (k=0; k<kazu[i][0]; k++)
               state[i][k] = 1;
           for (k=kazu[i][0]; k<N; k++)
               state[i][k] = 0;
        }
        setBinary();  
   }

   // �ϐ�state����A�c�����_�̐����������Akazu�ɐݒ�
   void count(){
        int num;
        for (int i=0; i<3; i++){
           num = 0;
           for (int j=0; j<kazu[i][0]; j++){
              if(state[i][j] == 1)
                 num++;
           }
           kazu[i][1] = num;
        }
   }

   // i�Ԃ߂̎R��j�Ԗڂ̖_������
   void setState(int i, int j){
        state[i][j] = 0;
   }

   // �ϐ�kazu�̌��݂̖_�̐�����A���̃o�C�i���\�������
   void setBinary(){
        String tmp;
        int len, i, j;

        for (i=0; i<3; i++){  
           tmp = Integer.toBinaryString(kazu[i][1]); //�{����2�i���\�L(������)
           len = tmp.length();
           for (j=len-1; j>=0; j--){
              if (tmp.charAt(j) == '1')
                 binary[i][j+B-len] = '1';
              else
                 binary[i][j+B-len] = '0';
           }
           for (int m=0; m<B-len; m++){
                 binary[i][m] = '0';
		   }
		   //���{����2�i���\�L�̕�����𕪉����āAchar�̔z��ɓ����
        }
    }

    public void drawYama(){
		GraphicsContext gc = getGraphicsContext2D();

		gc.clearRect(0, 0, w, h); 

        //�O���t�B�b�N�X��`��
		gc.setFill(Color.WHITE);
        gc.fillRect(0, 0, w, h);   // �w�i�h��
       	gc.setFill(Color.BLACK);
		gc.setFont(Font.font(18));
        gc.fillText("��̒[����C�ӂ̐��̖_���N���b�N���ď����Ă��������B", 10, 50);
        gc.fillText("�Ō�ɖ_���������ƂɂȂ������������ł��B", 10, 80);

        for (int i=0; i<3; i++){
           for (int j=0; j<N; j++){
              if (state[i][j] == 1){
                 gc.drawImage(barImg, bx+j*20, by+i*60);
              } else if (state[i][j] == 2){
                 gc.drawImage(delImg, bx+j*20, by+i*60);
              } else if (state[i][j] == 3){
                 gc.drawImage(checkImg, bx+j*20, by+i*60);
              }
           }
        }
		if(over == 1){
			gc.fillText("�R���s���[�^�̏����B�������ǂ��ł����H", 10, by+220);
		}else if(over == 2){
			gc.fillText("�l�Ԃ̏����B�������ǂ��ł����H", 10, by+220);
		}
    }

    public void debugPrint(){
        int i, j;
        System.out.println("State ");
        for (i=0; i<3; i++){
           for(j=0; j<N; j++)
             System.out.print(state[i][j] + "  ");
           System.out.println();
        }
        System.out.println("Binary ");
        for (i=0; i<3; i++){
           for(j=0; j<B; j++)
             System.out.print(binary[i][j] + "  ");
           System.out.println();
        }

        System.out.println("Kazu ");
        for (i=0; i<3; i++)
             System.out.print(kazu[i][1] + "  ");
        System.out.println();
    }
}
