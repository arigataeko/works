// レヴィ曲線
// JApplet版 アニメーションで生長

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
    int n;               // 繰り返し回数 
    int h,w;
    int sX, sY;        // 画を中央に描くためのスタート位置の調整
    double len;        // 線分の長さ 
    double x1,y1;      // 線分の左側の点のx,y座標
    final double RAD=Math.PI/180.0;  // ラジアンに変換するための値
    Color col;
    Thread th;
    boolean grow = false; //生長中 true
    int kaisu;   //今までに繰り返した数
    int interval = 500;

    Revi() {       // 初期化メソッド
       col = new Color(51,0,153);
       setBorder(BorderFactory.createMatteBorder(3,3,3,3,col));
       setMinimumSize(new Dimension(350, 350));  //最小サイズを設定
       setPreferredSize(new Dimension(350, 350));//望むサイズを設定
       n=1;            // 繰り返し回数 

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
       w=getSize().width;               // 幅
       h=getSize().height;              // 高さ
       g.setColor(Color.white); // 背景色 
       g.fillRect(0,0,w,h);        // 背景 
       g.setColor(col);  // 色の設定 

       x1=0.0;
       y1=0.0;
       //1辺の長さは((ルート2)のn乗分の1)
       //どんどん図が大きくなるので、wを3分の1にして計算
       len = ((double)w/3)/Math.pow(Math.sqrt(2), (double)n);
       sX = w/3;          //図のx位置の調整
       sY = h/2+50;          //図のy位置の調整
       //       System.out.println("kaisu " + kaisu + " n " + n);
       if(grow) drawRevi(g,kaisu,0.0);   //
    } 

    //レビ曲線を再帰的に描画
    public void drawRevi(Graphics g,int nn, double angle) { 
         double x2,y2; 
         if (nn <= 0) { 
            x2=len*Math.cos(angle*RAD)+x1;     //x座標
            y2=len*Math.sin(angle*RAD)+y1;     //y座標
            g.drawLine((int)(sX+x1),(int)(sY-y1),(int)(sX+x2),(int)(sY-y2)); 
            x1=x2; y1=y2;                  // x,yの置き換え 
            return; 
         } 
         angle=angle+45;
         drawRevi(g,nn-1,angle);     //左側の線分
         angle=angle-90;
         drawRevi(g,nn-1, angle);     //右側の線分
    }
} 


class InputP extends Panel implements ActionListener { 
   ReviApplet top;
   JButton goB;            //描画ボタン
   JComboBox nC;  // 選択

   InputP(ReviApplet t){
      top = t;
      setBackground(Color.white);
      nC = new JComboBox();      // 繰り返し回数の設定 
      nC.setBackground(Color.white);
      for (int i=1; i<=20; i++) {  
         nC.addItem(""+i); 
      } 
      goB=new JButton("描画"); // 描画ボタン 
      goB.setBackground(Color.white);
      //イベントリスナーの設定
      nC.addActionListener(this);
      goB.addActionListener(this); 
      //配置
      add(new Label("繰返し回数"));
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



