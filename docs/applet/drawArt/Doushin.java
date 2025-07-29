// マウスの動きで中心が移動する線

import java.awt.*; 
import java.awt.event.*; 
import javax.swing.*;

class Doushin extends JPanel {
   int mX, mY;
   int centerX, centerY, max, distance, kosu;
   Dimension size = new Dimension(450, 450);  
   Doushin(){
      setBackground(Color.white);     
      setMinimumSize(size);
      setPreferredSize(size);
      mX = size.width/2;
      mY = size.height/2;
      max = 300;
      distance = 2;
      kosu = max/2;
      addMouseMotionListener(new MouseMove());
      setBorder(BorderFactory.createEtchedBorder());
   }

   public void paintComponent(Graphics g){    
      super.paintComponent(g);
      centerX = getWidth()/2;  
      centerY = getHeight()/2;
      int x, y, r=max;
      float dx, dy;
      dx = (centerX-mX)/(float)(kosu);
      dy = (centerY-mY)/(float)(kosu);
      for(int i=kosu; i>=0; i--){
         r=r-distance;
         x = centerX - (int)(r/2.0F + dx*i);
         y = centerY - (int)(r/2.0F + dy*i);
         g.drawOval(x, y, r, r);
      }
   }

   class MouseMove extends MouseMotionAdapter{
       public void mouseDragged(MouseEvent e){
	   mX = e.getX();
           mY = e.getY();
           repaint();
       }
   }

   public static void main(String args[]){
      JFrame f  = new JFrame("Doushin Example");
      Doushin example = new Doushin();
      f.getContentPane().add(example, BorderLayout.CENTER);
      f.pack();
      f.setVisible(true);
   }
}
