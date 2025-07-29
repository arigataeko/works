// ミュンスタンバーク錯視

import java.awt.*; 
import java.awt.event.*; 
import javax.swing.*;

class Ichimatsu extends JPanel {
   int cw, ch;  //四角の横方向と縦方向の個数
   int rw, rh;  //1個の四角の幅と高さ
   int dy;   //縦方向の四角のずれ
   Rectangle unit;
   BasicStroke stroke;
   Dimension size = new Dimension(450, 450);  
   Ichimatsu(){
      setBackground(Color.white);     
      setMinimumSize(size);
      setPreferredSize(size);
      rw = 21; rh = 15;  dy=-6;
      cw = size.width/rw + 1;
      ch = size.height/rh +1;
      unit = new Rectangle(0, 0, rw, rh);
      stroke = new BasicStroke(2.0F);
   }

   public void paintComponent(Graphics g){    
      super.paintComponent(g);
      ((Graphics2D)g).setStroke(stroke);
      int x=0, y, wb;
      for(int i=0; i<=cw; i++){
          if(i%2==0){  y = 0; }
          else {  y = dy; }
          wb = (int)(Math.random()*2);  //白黒どちらからはじめるか決める
          for(int j=0; j<=ch; j++){
              unit.setLocation(x, y);
              if(wb==0){  //黒から始める
                  if(j%2==0) ((Graphics2D)g).fill(unit);  //偶数行は塗る
                  else ((Graphics2D)g).draw(unit);   //奇数行は枠のみ
              }
              else{   //白から始める
                  if(j%2==0) ((Graphics2D)g).draw(unit); //偶数行は枠のみ
                  else ((Graphics2D)g).fill(unit); //奇数行は塗る
              }
              y = y+rh;
          }
          x = x+rw;
      }
   }

   public static void main(String args[]){
      JFrame f  = new JFrame("Example");
      Ichimatsu example = new Ichimatsu();
      f.getContentPane().add(example, BorderLayout.CENTER);
      f.pack();
      f.setVisible(true);
   }
}

/*
*/
