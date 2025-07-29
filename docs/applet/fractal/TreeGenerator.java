// 練習問題12.4 木のフラクタルジェネレータ
import java.awt.*; 
import java.awt.event.*; 
import javax.swing.*;  

class TreeGenerator extends JPanel{
    InputP ip;
    Tree area;

    TreeGenerator(){
       setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
       area = new Tree();
       ip = new InputP(this);
       add(area);
       add(ip);            
    }

    public static void main(String args[]){
       JFrame f  = new JFrame("Tree Fractal Generator");
       TreeGenerator tg = new TreeGenerator();
       f.getContentPane().add(tg, BorderLayout.CENTER);
       f.pack();
       f.setVisible(true);
    }
}  


class InputP extends Panel implements ActionListener { 
   TreeGenerator top;
   JButton goB;            //描画ボタン
   JComboBox scaleC, angleC, nC;  // 選択

   InputP(TreeGenerator t){
      top = t;
      setBackground(Color.white);
      scaleC = new JComboBox();  // 育つ枝の比率の設定 
      for (double d=0.8; d>=0.5; d=d-0.05) { 
            scaleC.addItem((d+0.001+" ").substring(0,4)); 
      } 
      angleC = new JComboBox();  // 枝の広がる角度の設定 
      for (int i=30; i<=90; i+=10) {    
         angleC.addItem(""+i); 
      } 
      nC = new JComboBox();      // 繰り返し回数の設定 
      for (int i=1; i<=20; i++) {  
         nC.addItem(""+i); 
      } 
      goB=new JButton("描画"); // 描画ボタン 
      //イベントリスナーの設定
      scaleC.addActionListener(this);
      angleC.addActionListener(this);
      nC.addActionListener(this);
      goB.addActionListener(this); 
      //配置
      add(new Label("枝の比率"));  
      add(scaleC);
      add(new Label("枝の角度")); 
      add(angleC);
      add(new Label("成長回数"));
      add(nC);
      add(goB);
      } 
   public void actionPerformed(ActionEvent e) { 
      if(e.getSource() == goB) {  top.area.repaint();  } 
      Object obj=e.getSource(); 
      if(obj == scaleC) {
         top.area.scale =
             Double.valueOf((String)scaleC.getSelectedItem()).doubleValue();
       } else if (obj == angleC) {
         top.area.angle =
             Integer.valueOf((String)angleC.getSelectedItem()).intValue();
       } else if (obj == nC) { 
         top.area.n = Integer.valueOf((String)nC.getSelectedItem()).intValue();
       }

   }
}

class Tree extends JPanel{
    double scale;      // 育つ枝の比率 
    int angle;          // 枝の広がる角度 
    int n;               // 繰り返し回数 
    double stand,len;    // 最初の枝の方向、枝の長さ 
    int w,h; 
    final double RAD=Math.PI/180.0;  // ラジアンに変換するための値

    Tree() {   // 初期化メソッド 
       setBorder(BorderFactory.createMatteBorder(3,3,3,3,Color.green));
       setMinimumSize(new Dimension(300, 300));  //最小サイズを設定
       setPreferredSize(new Dimension(300, 300));//望むサイズを設定
       scale=0.8;      // 育つ枝の比率 
       angle=30;       // 枝の広がる角度 
       n=1;            // 繰り返し回数 
       stand=90;
       len=100;    // 最初の枝の長さ 
    }   

    public void paintComponent(Graphics g) { 
       w=getSize().width;               // 幅
       h=getSize().height;              // 高さ
       g.setColor(Color.white);  // 背景色 
       g.fillRect(0,0,w,h);            // 背景 
       g.setColor(new Color(100, 153, 0));  // 色の設定 
       drawTree(g,n,w/2,0,len,stand);        // 木を描く 
    }
    
    //木を再帰的に描く
    void drawTree(Graphics g, int nn, double x1, double y1, 
                                                double len,double stand){ 
       double x2,y2; 
       x2=len*Math.cos(RAD*stand)+x1;            //枝先のx座標
       y2=len*Math.sin(RAD*stand)+y1;            //枝先のy座標
       g.drawLine((int)x1,(int)(h-y1),(int)x2,(int)(h-y2)); 

       if(nn>1){
       drawTree(g,nn-1,x2,y2,len*scale,stand-angle); //次の右の枝 
       drawTree(g,nn-1,x2,y2,len*scale,stand+angle); //次の左の枝 
       }
     } 
}



