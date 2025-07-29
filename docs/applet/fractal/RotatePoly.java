import java.awt.*;
import java.awt.event.*;
import java.applet.Applet;

public class RotatePoly extends Applet{
    DrawArea drawArea;   //�����Х����Ǽ�����ѿ� 
    InputP ip;          //���ϥѥͥ���Ǽ�����ѿ�

    int defaultPoly=4;          //�ǥե���Ȥ�¿�ѷ�
    int defaultRe=50;           //�ǥե���Ȥη��֤����
    int poly = defaultPoly;           //����¿�ѷ���ĺ����
    int number = defaultRe;         //�����֤����
    int w = 400;              //�����Х�����
    int h = 400;              //�����Х��ι⤵

    public void init(){
        setLocale(java.util.Locale.JAPANESE);
        FlowLayout layout = new FlowLayout();
        setLayout(layout);    //��������������
        ip = new InputP();     //���ϥѥͥ����
        drawArea = new DrawArea(w,h);  //�����Х�����
        add(drawArea);        //�����Х�������
        add(ip);              //���ϥѥͥ������
        setBackground(Color.white);
    }   

    //�ܥ�����֤��ѥͥ�
    class InputP extends Panel implements ActionListener{
        TextField polyN, retN;
        Button  goB;
        InputP(){ 
            polyN = new TextField(String.valueOf(defaultPoly), 5);
            retN = new TextField(String.valueOf(defaultRe), 5);
            polyN.setBackground(Color.white);
            retN.setBackground(Color.white); 
            goB = new Button("����");
            polyN.addActionListener(this);
            retN.addActionListener(this);
            goB.addActionListener(this);
            add(new Label("n�ѷ�")); 
            add(polyN); 
            add(new Label("�����֤����")); 
            add(retN); 
            add(goB);
        }         

        //�������ܥ���˹�碌�ơ������޷��Υ����פ����� 
        public void actionPerformed(ActionEvent e) {  
           if(e.getSource() == polyN){
              retN.requestFocus();
           }else if(e.getSource() == retN){
              goB.requestFocus();
           }else if(e.getSource() == goB){
              try{
                poly = Integer.valueOf(polyN.getText()).intValue();
               } catch (NumberFormatException error){ poly = defaultPoly; }
              try{
                number = Integer.valueOf(retN.getText()).intValue();
               } catch (NumberFormatException error){ number = defaultRe; }
              drawArea.repaint();
           }
        }
    }

//�޷������������Х�
    class DrawArea extends Canvas {
       double angle = 0.05;
       double a,c;
       double x[], y[]; 
       
       //���󥹥ȥ饯��
       DrawArea(int w, int h){
          setSize(w, h);   //�����Х����礭��������
       }

      void calc(){
          double work;
          x = new double[poly];
          y = new double[poly];
          a = Math.PI * (1-2/(double)poly);
          c = Math.sin(a)/(Math.sin(angle) + Math.sin(a+angle));
          for(int i=0; i<poly; i++){ //�ǽ��¿�ѷ��κ�ɸ
             work = (2*i+1) * Math.PI/poly;
             x[i] = Math.sin(work);
             y[i] = Math.cos(work);
          }
       }

       public void paint(Graphics g){
          double work;
          calc();
          for(int i=0; i<number; i++){
              g.drawPolygon(transX(x), transY(y), poly);
              //����¿�ѷ��κ�ɸ�׻�
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
