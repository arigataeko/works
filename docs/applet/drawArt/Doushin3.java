// マウスの動きで中心が移動する線

import java.awt.*; 
import java.awt.event.*; 
import javax.swing.*;
import java.awt.image.*;
import java.awt.geom.*;

class Doushin3 extends JPanel implements ActionListener {
   int mX, mY, limit; //マウスクリックの位置、円の半径の最大値
   int x, y, r;  //円の位置と直径
   int []distance = {3,6,10,15,10,6,3};   //円の間隔
   int cycle=0;     //円の間隔を決める巡回値
   Dimension size = new Dimension(450, 450);  
   Timer timer;
   BufferedImage bufferImg;  //バッファイメージ
   Graphics bufferG;         //バッファイメージのグラフィック

   Doushin3(){
      setBackground(Color.white);     
      setMinimumSize(size);
      setPreferredSize(size);
      mX = size.width/2;
      mY = size.height/2;
      addMouseListener(new MouseClick());
      setBorder(BorderFactory.createEtchedBorder());
      timer = new Timer(100, this);
      timer.setInitialDelay(0);
      timer.start();

      // バッファイメージを作る
        bufferImg = new BufferedImage(getPreferredSize().width, 
                                      getPreferredSize().height, 
                                      BufferedImage.TYPE_INT_RGB);
      // バッファイメージのGraphicsを得る
        bufferG = bufferImg.getGraphics();
        bufferG.setColor(Color.white);
        bufferG.fillRect(0,0,
            getPreferredSize().width, getPreferredSize().height); 
   }

   public void paintComponent(Graphics g){    
      super.paintComponent(g);
      bufferG.drawOval(x, y, r, r);
      g.drawImage(bufferImg, 0, 0, this);
   }

   class MouseClick extends MouseAdapter{
       public void mousePressed(MouseEvent e){
           r=0;
           cycle=0;
	       mX = e.getX();
           mY = e.getY();
           bufferG.setColor(Color.white);
           bufferG.fillRect(0,0,
               getPreferredSize().width, getPreferredSize().height); 
           bufferG.setColor(Color.blue);
           timer.start();
      
       }
   }
  
   public void actionPerformed(ActionEvent e){
      int w = getSize().width;
      int h = getSize().height;
      limit = (int)(Math.sqrt(w*w + h*h));
      if(r < limit*2){
         r=r+calcDistance();
         x = mX - r/2;
         y = mY - r/2;
         repaint();
      }
      else {
         r=0;
         timer.stop();
      }
   }

   int calcDistance(){
       int d = distance[cycle];
       cycle++;
       if(cycle>=distance.length) cycle=0;
       return d;
   }
  
   public static void main(String args[]){
      JFrame f  = new JFrame("Doushin Example");
      Doushin3 example = new Doushin3();
      f.getContentPane().add(example, BorderLayout.CENTER);
      f.pack();
      f.setVisible(true);
   }
}
