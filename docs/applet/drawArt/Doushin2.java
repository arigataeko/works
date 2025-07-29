// マウスの動きで中心が移動する線

import java.awt.*; 
import java.awt.event.*; 
import javax.swing.*;

class Doushin2 extends JPanel {
   int mX, mY;
   int centerX, centerY, max, distance, kosu;
   Dimension size = new Dimension(450, 450);  
   Doushin2(){
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
      int x, y, r=0;
      float dx, dy;
      dx = (centerX-mX)/(float)(kosu);
      dy = (centerY-mY)/(float)(kosu);
      for(int i=1; i<=kosu; i++){
         r=r+distance;
         x = (int)(mX + dx*i - r/2.0F);
         y = (int)(mY + dy*i - r/2.0F);
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
      Doushin2 example = new Doushin2();
      f.getContentPane().add(example, BorderLayout.CENTER);
      f.pack();
      f.setVisible(true);
   }
}
