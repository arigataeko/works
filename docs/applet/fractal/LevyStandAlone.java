 // �����B�Ȑ�
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;


public class LevyStandAlone extends JPanel{
    InputP ip;
    DrawLevy da;
    int n=1;               // �J��Ԃ��� 
    int h,w;
    public LevyStandAlone() {
       w=400;               // ��
       h=400;              // ����
       BoxLayout layout = new BoxLayout(this, BoxLayout.Y_AXIS);
       setLayout(layout);    //�z�u������ݒ�
       ip = new InputP();     //���̓p�l�������
       da = new DrawLevy(w,h-40);  //�L�����o�X�����
       add(da);
       add(ip);
    } 

    public static void main(String args[]){
       JFrame f  = new JFrame("Levy curve");
       LevyStandAlone example = new  LevyStandAlone();
       f.getContentPane().add(example, BorderLayout.CENTER);
       f.pack();
       f.setVisible(true);
    }

   //�{�^����u���p�l��
   class InputP extends Panel implements ActionListener,ItemListener { 
       Button goB;            //�`��{�^��
       Choice nC;  // �I��
       InputP(){
         nC = new Choice();     // �J��Ԃ��񐔂̐ݒ�
         for (int i=1; i<=15; i++) {  
            nC.addItem(""+i); 
         } 
         goB = new Button("�`��");
         //�C�x���g���X�i�[�̐ݒ�  
         nC.addItemListener(this);
         goB.addActionListener(this);
         //�z�u
         add(new Label("�J��Ԃ���"));
         add(nC);
         add(goB);
      }
      public void actionPerformed(ActionEvent e) { // �{�^�� 
         if (e.getSource() == goB) {   
            da.repaint(); 
         } 
      } 

      public void itemStateChanged(ItemEvent e) { // �`���C�X 
         if (e.getSource() == nC) { 
            n=nC.getSelectedIndex()+1; //�J��Ԃ��񐔌���
         } 
      }
   }
   class DrawLevy extends Canvas {
       int w, h;
       int sX, sY;        // ���canvas�̒����ɕ`�����߂̃X�^�[�g�ʒu�̒���
       double len;        // �����̒��� 
       double x0,y0;      // �����̍����̓_��x,y���W
       static final double RAD=Math.PI/180.0;  // ���W�A���ɕϊ����邽�߂̒l
       Color col;         // �����̐F
       Color colB;        // �w�i�̐F
       DrawLevy(int w, int h){  //�R���X�g���N�^
          setSize(w, h);   //�L�����o�X�̑傫����ݒ�
          this.w=w;
          this.h=h;
          col = new Color(0, 0, 124);
          colB = new Color(255, 255, 211);
       }

     public void paint( Graphics g ) { 
         x0=0.0;
         y0=0.0;
         //1�ӂ̒�����((���[�g2)��n�敪��1)
         //�ǂ�ǂ�}���傫���Ȃ�̂ŁAw��3����1�ɂ��Čv�Z
         len = ((double)w/3)/Math.pow(Math.sqrt(2), (double)n);
         g.setColor(colB); // �w�i�F 
         g.fillRect(0,0,w,h);        // �w�i 
         g.setColor(col);       // �`��F
         levyCarve(g,n);               // �R�b�z�Ȑ���`��
      } 

      public void levyCarve(Graphics g,int nn) { 
         sX = w/3;          //�}��x�ʒu�̒���
         sY = h/2;          //�}��y�ʒu�̒���
         rlevy(g,nn,0.0);   //�x�[�X���C������{�̃��r�Ȑ�
      }

      //���r�Ȑ����ċA�I�ɕ`��
      public void rlevy(Graphics g,int nn, double angle) { 
         double x,y; 
         if (nn <= 0) { 
            x=len*Math.cos(angle*RAD)+x0;     //x���W
            y=len*Math.sin(angle*RAD)+y0;     //y���W
            g.drawLine((int)(sX+x0),(int)(sY-y0),(int)(sX+x),(int)(sY-y)); 
            x0=x; y0=y;                  // x,y�̒u������ 
            return; 
         } 
         angle=angle+45;
         rlevy(g,nn-1,angle);     //�����̐���
         angle=angle-90;
         rlevy(g,nn-1, angle);     //�E���̐���
      }
  } 
 } 


