// 木構造 
// 非swing版 アニメーションで木が生長

 import java.awt.*; 
 import java.awt.event.*;  
 import java.applet.Applet; 

 public class Tree extends Applet{
    InputP ip;            //
    DrawArea da;
    double scale;      // 育つ枝の比率 
    int angle;          // 枝の広がる角度 
    int n;               // 繰り返し回数 
    double stand,len;    // 最初の枝の方向、枝の長さ 
    int w,h; 
    Color treeColor;
    boolean grow = false; //生長中 true
    public void init() {   // アプレットの初期化メソッド 
       scale=0.7;      // 育つ枝の比率 初期値
       angle=30;       // 枝の広がる角度 初期値
       n=1;            // 繰り返し回数 
       stand=90;
       len=80;    // 最初の枝の長さ 
       w=getSize().width;               // 幅
       h=getSize().height;              // 高さ

        treeColor = new Color(0,102,0);
        FlowLayout layout = new FlowLayout();
        setLayout(layout);    //配置方式を設定
        ip = new InputP();     //入力パネルを作る
        da = new DrawArea(w,h-40);  //キャンバスを作る
        add(da);        //キャンバスを配置
        add(ip);              //入力パネルを配置
        setBackground(treeColor);
    }   

    //ボタンを置くパネル
    class InputP extends Panel implements ActionListener,ItemListener { 
       Button goB;            //描画ボタン
       Choice scaleC, angleC, nC;  // 選択

       InputP(){
         setBackground(treeColor);
         setForeground(Color.white);

         scaleC = new Choice();  // 育つ枝の比率の設定 
         scaleC.setBackground(treeColor);
         for (double d=1.0; d>=0.5; d=d-0.05) { 
            scaleC.addItem((d+0.001+" ").substring(0,4)); 
         } 
         scaleC.select(String.valueOf(scale)+ "0");  //初期値

         angleC = new Choice();  // 枝の広がる角度の設定 
         angleC.setBackground(treeColor);
         for (int i=20; i<=90; i+=5) {    
            angleC.addItem(""+i); 
         } 
         angleC.select(String.valueOf(angle));

         nC = new Choice();      // 繰り返し回数の設定 
         nC.setBackground(treeColor);
         for (int i=1; i<=20; i++) {  
            nC.addItem(""+i); 
         } 
         nC.select(String.valueOf(n));

         goB=new Button("描画"); // 描画ボタン 
         goB.setBackground(treeColor);
         //イベントリスナーの設定
         scaleC.addItemListener(this);     
         angleC.addItemListener(this);     
         nC.addItemListener(this);     
         goB.addActionListener(this); 
         //配置
         Label nagasaL = new Label("枝の比率");  
         nagasaL.setBackground(treeColor);
         add(nagasaL); 
         add(scaleC);
         Label kakudoL = new Label("枝の角度"); 
         kakudoL.setBackground(treeColor);
         add(kakudoL); 
         add(angleC);
         Label kaisuL = new Label("成長回数"); 
         kaisuL.setBackground(treeColor);
         add(kaisuL);
         add(nC);
         add(goB);
      } 
      public void actionPerformed(ActionEvent e) { // ボタン 
         if(e.getSource() == goB) {  
            if(!grow) { da.start(); }
         }
      }
      public void itemStateChanged(ItemEvent e) { // チョイス 
         Object org=e.getSource(); 
         if(org == scaleC) {
            scale = Double.valueOf(scaleC.getSelectedItem()).doubleValue();
          } else if (org == angleC) {
            angle = Integer.valueOf(angleC.getSelectedItem()).intValue();
          } else if (org == nC) { 
            n = Integer.valueOf(nC.getSelectedItem()).intValue();
          }
      } 
    }

    //図形を描くキャンバス
    class DrawArea extends Canvas implements Runnable{
       int w, h;
       static final double RAD=Math.PI/180.0;  // ラジアンに変換するための値

       Thread growThread;
       int kaisu=1;
       int interval=500;
       Image offImage;
       Graphics offg;
       DrawArea(int w, int h){  //コンストラクタ
          setSize(w, h);   //キャンバスの大きさを設定
          this.w=w;
          this.h=h;
       }

	public void start(){
	   if(growThread == null){
	       growThread = new Thread(this);
           }
           growThread.start();
           grow=true;
	}

	public void run(){
            Thread.currentThread().setPriority(Thread.MIN_PRIORITY);
	    while(Thread.currentThread() == growThread){
                if(kaisu>n) { 
                   growThread=null;
                   offg=null; offImage=null;
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


      public void paint(Graphics g) { 
	  update(g);
      }
	public void update(Graphics g){
	  if(offg==null){
              offImage = createImage(w,h);
              offg = offImage.getGraphics();
          }
          offg.setColor(Color.white);  // 背景色 
          offg.fillRect(0,0,w,h);      // 背景 
          offg.setColor(treeColor); // 色の設定 
          rtree(offg,kaisu,w/2,0,len,stand);        // 木を描く 
          g.drawImage(offImage, 0,0,this);
      }
      //木を再帰的に描く
      public void rtree(Graphics g, int nn, double x0, double y0, 
                                                double len,double stand){ 
	  //         if (nn <= 0) { return; } 
         double x,y; 
         x=len*Math.cos(RAD*stand)+x0;            //枝先のx座標
         y=len*Math.sin(RAD*stand)+y0;            //枝先のy座標
         g.drawLine((int)x0,(int)(h-y0),(int)x,(int)(h-y)); 
         if(nn>1){
           rtree(g,nn-1,x,y,len*scale,stand-angle); //次の右の枝 
           rtree(g,nn-1,x,y,len*scale,stand+angle); //次の左の枝 
         }
       } 
     }
}  

