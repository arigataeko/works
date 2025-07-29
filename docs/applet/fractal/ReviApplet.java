// ���������
// JApplet�� ���˥᡼��������Ĺ

import java.awt.*; 
import java.awt.event.*; 
import javax.swing.*;

public class ReviApplet extends JApplet{
    InputP ip;
    Revi area;
    public void init(){
       area = new Revi();
       ip = new InputP(this);
       Container c = getContentPane();
       c.setLayout(new BoxLayout(c, BoxLayout.Y_AXIS));
       c.add(area);
       c.add(ip);
   }
}


class Revi extends JPanel implements Runnable{
    int n;               // �����֤���� 
    int h,w;
    int sX, sY;        // ����������������Υ������Ȱ��֤�Ĵ��
    double len;        // ��ʬ��Ĺ�� 
    double x1,y1;      // ��ʬ�κ�¦������x,y��ɸ
    final double RAD=Math.PI/180.0;  // �饸������Ѵ����뤿�����
    Color col;
    Thread th;
    boolean grow = false; //��Ĺ�� true
    int kaisu;   //���ޤǤ˷����֤�����
    int interval = 500;

    Revi() {       // ������᥽�å�
       col = new Color(51,0,153);
       setBorder(BorderFactory.createMatteBorder(3,3,3,3,col));
       setMinimumSize(new Dimension(350, 350));  //�Ǿ�������������
       setPreferredSize(new Dimension(350, 350));//˾�ॵ����������
       n=1;            // �����֤���� 

    }

	public void start(){
	   if(th == null){
	       th = new Thread(this);
           }
           th.start();
           grow=true;
	}

	public void run(){
            Thread.currentThread().setPriority(Thread.MIN_PRIORITY);
	    while(Thread.currentThread() == th){
                if(kaisu>n) { 
                   th=null;
                   grow=false; 
                   kaisu=1; 
                   break;
                }
                repaint();
		try{
		    Thread.sleep(interval);
                }catch (InterruptedException e){ break; }
                kaisu++;
            }
	} 


   public void paintComponent(Graphics g) { 
       w=getSize().width;               // ��
       h=getSize().height;              // �⤵
       g.setColor(Color.white); // �طʿ� 
       g.fillRect(0,0,w,h);        // �ط� 
       g.setColor(col);  // �������� 

       x1=0.0;
       y1=0.0;
       //1�դ�Ĺ����((�롼��2)��n��ʬ��1)
       //�ɤ�ɤ�ޤ��礭���ʤ�Τǡ�w��3ʬ��1�ˤ��Ʒ׻�
       len = ((double)w/3)/Math.pow(Math.sqrt(2), (double)n);
       sX = w/3;          //�ޤ�x���֤�Ĵ��
       sY = h/2+50;          //�ޤ�y���֤�Ĵ��
       //       System.out.println("kaisu " + kaisu + " n " + n);
       if(grow) drawRevi(g,kaisu,0.0);   //
    } 

    //��Ӷ�����Ƶ�Ū������
    public void drawRevi(Graphics g,int nn, double angle) { 
         double x2,y2; 
         if (nn <= 0) { 
            x2=len*Math.cos(angle*RAD)+x1;     //x��ɸ
            y2=len*Math.sin(angle*RAD)+y1;     //y��ɸ
            g.drawLine((int)(sX+x1),(int)(sY-y1),(int)(sX+x2),(int)(sY-y2)); 
            x1=x2; y1=y2;                  // x,y���֤����� 
            return; 
         } 
         angle=angle+45;
         drawRevi(g,nn-1,angle);     //��¦����ʬ
         angle=angle-90;
         drawRevi(g,nn-1, angle);     //��¦����ʬ
    }
} 


class InputP extends Panel implements ActionListener { 
   ReviApplet top;
   JButton goB;            //����ܥ���
   JComboBox nC;  // ����

   InputP(ReviApplet t){
      top = t;
      setBackground(Color.white);
      nC = new JComboBox();      // �����֤���������� 
      nC.setBackground(Color.white);
      for (int i=1; i<=20; i++) {  
         nC.addItem(""+i); 
      } 
      goB=new JButton("����"); // ����ܥ��� 
      goB.setBackground(Color.white);
      //���٥�ȥꥹ�ʡ�������
      nC.addActionListener(this);
      goB.addActionListener(this); 
      //����
      add(new Label("���֤����"));
      add(nC);
      add(goB);
      } 
   public void actionPerformed(ActionEvent e) { 
      Object obj=e.getSource(); 
      if(obj == goB) { 
	  //         top.area.repaint(); 
         if(!top.area.grow) { top.area.start(); }
      } else if (obj == nC) { 
         top.area.n = Integer.valueOf((String)nC.getSelectedItem()).intValue();
       }

   }
}



