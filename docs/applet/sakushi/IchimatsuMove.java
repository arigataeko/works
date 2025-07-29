// �~�����X�^���o�[�N���� 
// �񂲂Ƃɓ���

import java.awt.*; 
import java.awt.event.*; 
import javax.swing.*;

class IchimatsuMove extends JPanel {
   Dimension size = new Dimension(450, 450);  
   Row line[];
   int rw=21;  //1�̎l�p�̕�
   int cw; //�l�p�̉������̌�

   IchimatsuMove(){
      setMinimumSize(size);
      setPreferredSize(size);
      cw = size.width/rw+1;
      setLayout(new FlowLayout(FlowLayout.CENTER, 0,0));
      line = new Row[cw];
      for(int i=0; i<cw; i++){
        if(i%2==0){  line[i] = new Row(size.height, rw, -12); }
        else { line[i] = new Row(size.height, rw, -6); }
        add(line[i]);
      }
   }

   void start(){
      for(int i=0; i<cw; i++){
	line[i].go();
      }
   }

   public static void main(String args[]){
      JFrame f  = new JFrame("Sakushi Example");
      IchimatsuMove example = new IchimatsuMove();
      f.getContentPane().add(example, BorderLayout.CENTER);
      f.pack();
      f.setVisible(true);
      example.start();
   }
}

class Row extends JPanel implements ActionListener{
   int panelH;  //�p�l���̍���
   int rw, rh=15;  //1�̎l�p�̕��ƍ���
   int dy=6;   //�c�����̎l�p�̂���
   int startY;  //y���W�̊J�n�̂���
   Rectangle unit;
   BasicStroke stroke;
   Timer timer;
   int interval=200;
   int di = 10;  //1��̃X�s�[�h�����@ms

   //h �͊O���̃p�l���̍���, rectW�͈�̎l�p�̕�, sy��y���W�̊J�n�̂���
   Row(int h, int rectW, int sy){
      rw = rectW;
      panelH = h;
      startY = sy;
      setBackground(Color.white);     
      Dimension size = new Dimension(rw, h);  
      setMinimumSize(size);
      setPreferredSize(size);
      unit = new Rectangle(0, 0, rw, rh);
      stroke = new BasicStroke(2.0F);
      timer = new Timer(interval, this);
      timer.setInitialDelay(3);
      timer.setCoalesce(true);

      addMouseListener(new GetFocus());
      addKeyListener(new KeyType());
   }

     void go(){
            timer.start();
     }

    public void actionPerformed(ActionEvent e){
        setYPosition();
        repaint();
    }

    void setYPosition(){
        startY = startY+3;
        if(startY > 0){  startY = -12; }
    }


    void setInterval(int o){
        if (o=='+') { interval = interval - di; }
        else if (o=='-') { interval = interval + di; }
        if(interval <= 50){  interval = 50 ; }
        else if(interval >= 400){  interval = 400 ; }
        timer.setDelay(interval);
        if(timer.isRunning() && interval >=400){ timer.stop(); }
        else if(!timer.isRunning() && interval < 400) { timer.restart(); }
    }


   public void paintComponent(Graphics g){    
      super.paintComponent(g);
      ((Graphics2D)g).setStroke(stroke);
      int y=startY, wb, j;
      wb = (int)(Math.random()*2);  //�����ǂ��炩��͂��߂邩���߂�
      for(j=0; y<=panelH; y=y+rh, j++){
         unit.setLocation(0, y);
         if(wb==0){  //������n�߂�
            if(j%2==0) ((Graphics2D)g).fill(unit);  //�����s�͓h��
            else ((Graphics2D)g).draw(unit);   //��s�͘g�̂�
         }
         else{   //������n�߂�
            if(j%2==0) ((Graphics2D)g).draw(unit); //�����s�͘g�̂�
            else ((Graphics2D)g).fill(unit); //��s�͓h��
         }
      }
   }

    class GetFocus extends MouseAdapter{
       public void mousePressed(MouseEvent e){
           requestFocus();
       }
    }

    class KeyType extends KeyAdapter{
       public void keyPressed(KeyEvent e){
          int c=e.getKeyCode();
          if(c == KeyEvent.VK_UP)
              setInterval('+');
          else if(c == KeyEvent.VK_DOWN)
              setInterval('-');
       }
    }
}
