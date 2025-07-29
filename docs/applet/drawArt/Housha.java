// マウスの動きで中心が移動する線

import java.awt.*; 
import java.awt.event.*; 
import javax.swing.*;

class Housha extends JPanel {
   int mX, mY;
   int centerX, centerY, len;
   Dimension size = new Dimension(450, 450);  
   Housha(){
      setBackground(Color.white);     
      setMinimumSize(size);
      setPreferredSize(size);
      mX = size.width/2;
      mY = size.height/2;
      len = 200;
      addMouseMotionListener(new MouseMove());
   }

   public void paintComponent(Graphics g){    
      super.paintComponent(g);
      centerX = getWidth()/2;  
      centerY = getHeight()/2;
      int x, y;
      double angle;
      for(int i=0; i<=360; i=i+2){
        angle = i*Math.PI/180;
        x = centerX + (int)(len*Math.cos(angle));
        y = centerY - (int)(len*Math.sin(angle));
        g.drawLine(mX, mY, x, y);
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
      JFrame f  = new JFrame("Housya Example");
      Housha example = new Housha();
      f.getContentPane().add(example, BorderLayout.CENTER);
      f.pack();
      f.setVisible(true);
   }
}
