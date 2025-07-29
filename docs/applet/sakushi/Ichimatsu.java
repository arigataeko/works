// �~�����X�^���o�[�N����

import java.awt.*; 
import java.awt.event.*; 
import javax.swing.*;

class Ichimatsu extends JPanel {
   int cw, ch;  //�l�p�̉������Əc�����̌�
   int rw, rh;  //1�̎l�p�̕��ƍ���
   int dy;   //�c�����̎l�p�̂���
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
          wb = (int)(Math.random()*2);  //�����ǂ��炩��͂��߂邩���߂�
          for(int j=0; j<=ch; j++){
              unit.setLocation(x, y);
              if(wb==0){  //������n�߂�
                  if(j%2==0) ((Graphics2D)g).fill(unit);  //�����s�͓h��
                  else ((Graphics2D)g).draw(unit);   //��s�͘g�̂�
              }
              else{   //������n�߂�
                  if(j%2==0) ((Graphics2D)g).draw(unit); //�����s�͘g�̂�
                  else ((Graphics2D)g).fill(unit); //��s�͓h��
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
