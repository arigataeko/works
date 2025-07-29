
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class RotatePolyStandAlone extends JPanel{
    DrawArea drawArea;   //�L�����o�X���i�[����ϐ�
    InputP ip;          //���̓p�l�����i�[����ϐ�
    int poly;           //�`�����p�`�̒��_��
    int number;         //�J��Ԃ���
    int w = 400;              //�L�����o�X�̕�
    int h = 400;              //�L�����o�X�̍���

    public RotatePolyStandAlone(){
        setLocale(java.util.Locale.JAPANESE);
        BoxLayout layout = new BoxLayout(this, BoxLayout.Y_AXIS);
        setLayout(layout);    //�z�u������ݒ�
        ip = new InputP();     //���̓p�l�������
        drawArea = new DrawArea(w,h);  //�L�����o�X�����
        add(drawArea);        //�L�����o�X��z�u
        add(ip);              //���̓p�l����z�u
    }

    public static void main(String args[]){
       JFrame f  = new JFrame("Rotate Polygon");
       RotatePolyStandAlone example = new RotatePolyStandAlone();
       f.getContentPane().add(example, BorderLayout.CENTER);
       f.pack();
       f.setVisible(true);
    }

    //�{�^����u���p�l��
    class InputP extends Panel implements ActionListener{
        TextField polyN, retN;
        Button  goB;
        InputP(){
            polyN = new TextField(5);
            retN = new TextField(5);
            goB = new Button("�`��");
            polyN.addActionListener(this);
            retN.addActionListener(this);
            goB.addActionListener(this);
            add(new Label("n�p�`"));
            add(polyN);
            add(new Label("�J��Ԃ���"));
            add(retN);
            add(goB);
        }

        //�������{�^���ɍ��킹�āA�`���}�`�̃^�C�v��ݒ�
        public void actionPerformed(ActionEvent e) {
           if(e.getSource() == polyN){
              retN.requestFocus();
           }else if(e.getSource() == retN){
              goB.requestFocus();
           }else if(e.getSource() == goB){
              try{
                poly = Integer.valueOf(polyN.getText()).intValue();
               } catch (NumberFormatException error){ poly =4; }
              try{
                number = Integer.valueOf(retN.getText()).intValue();
               } catch (NumberFormatException error){ number = 32; }
              drawArea.calc();
           }
        }
    }

//�}�`��`���L�����o�X
    class DrawArea extends Canvas {
       double angle = 0.05;
       double a,c;
       double x[], y[];

       //�R���X�g���N�^
       DrawArea(int w, int h){
          setSize(w, h);   //�L�����o�X�̑傫����ݒ�
       }

      void calc(){
          double work;
          x = new double[poly];
          y = new double[poly];
          a = Math.PI * (1-2/(double)poly);
          c = Math.sin(a)/(Math.sin(angle) + Math.sin(a+angle));
          for(int i=0; i<poly; i++){ //�ŏ��̑��p�`�̍��W
             work = (2*i+1) * Math.PI/poly;
             x[i] = Math.sin(work);
             y[i] = Math.cos(work);
          }
          repaint();
       }

       public void paint(Graphics g){
          double work;
          for(int i=0; i<number; i++){

              g.drawPolygon(transX(x), transY(y), poly);
         /*
         for(int k=0; k<poly; k++){
           System.out.print("("+ x[k] + " " + y[k] + ") ");
         }
         System.out.println(" ");
         */

              //���̑��p�`�̍��W�v�Z
              for(int k=0; k<poly; k++){
                work =x[k];
                x[k] = (work*Math.cos(angle) - y[k]*Math.sin(angle))*c;
                y[k] = (work*Math.sin(angle) + y[k]*Math.cos(angle))*c;
              }
            }
        }

       public int[] transX(double n[]){
           int tx[];
           tx = new int[poly];
           for(int i=0; i<poly; i++){
             tx[i] = (int)(n[i]*w/2 + w/2);
           }
           return tx;
       }
      public int[] transY(double n[]){
           int ty[];
           ty = new int[poly];
           for(int i=0; i<poly; i++){
              ty[i] = (int)(n[i]*h/2 + h/2);
           }
           return ty;
       }
    }
}
