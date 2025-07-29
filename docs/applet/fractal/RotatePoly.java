import java.awt.*;
import java.awt.event.*;
import java.applet.Applet;

public class RotatePoly extends Applet{
    DrawArea drawArea;   //キャンバスを格納する変数 
    InputP ip;          //入力パネルを格納する変数

    int defaultPoly=4;          //デフォルトの多角形
    int defaultRe=50;           //デフォルトの繰返し回数
    int poly = defaultPoly;           //描く多角形の頂点数
    int number = defaultRe;         //繰り返し回数
    int w = 400;              //キャンバスの幅
    int h = 400;              //キャンバスの高さ

    public void init(){
        setLocale(java.util.Locale.JAPANESE);
        FlowLayout layout = new FlowLayout();
        setLayout(layout);    //配置方式を設定
        ip = new InputP();     //入力パネルを作る
        drawArea = new DrawArea(w,h);  //キャンバスを作る
        add(drawArea);        //キャンバスを配置
        add(ip);              //入力パネルを配置
        setBackground(Color.white);
    }   

    //ボタンを置くパネル
    class InputP extends Panel implements ActionListener{
        TextField polyN, retN;
        Button  goB;
        InputP(){ 
            polyN = new TextField(String.valueOf(defaultPoly), 5);
            retN = new TextField(String.valueOf(defaultRe), 5);
            polyN.setBackground(Color.white);
            retN.setBackground(Color.white); 
            goB = new Button("描画");
            polyN.addActionListener(this);
            retN.addActionListener(this);
            goB.addActionListener(this);
            add(new Label("n角形")); 
            add(polyN); 
            add(new Label("繰り返し回数")); 
            add(retN); 
            add(goB);
        }         

        //押したボタンに合わせて、描く図形のタイプを設定 
        public void actionPerformed(ActionEvent e) {  
           if(e.getSource() == polyN){
              retN.requestFocus();
           }else if(e.getSource() == retN){
              goB.requestFocus();
           }else if(e.getSource() == goB){
              try{
                poly = Integer.valueOf(polyN.getText()).intValue();
               } catch (NumberFormatException error){ poly = defaultPoly; }
              try{
                number = Integer.valueOf(retN.getText()).intValue();
               } catch (NumberFormatException error){ number = defaultRe; }
              drawArea.repaint();
           }
        }
    }

//図形を描くキャンバス
    class DrawArea extends Canvas {
       double angle = 0.05;
       double a,c;
       double x[], y[]; 
       
       //コンストラクタ
       DrawArea(int w, int h){
          setSize(w, h);   //キャンバスの大きさを設定
       }

      void calc(){
          double work;
          x = new double[poly];
          y = new double[poly];
          a = Math.PI * (1-2/(double)poly);
          c = Math.sin(a)/(Math.sin(angle) + Math.sin(a+angle));
          for(int i=0; i<poly; i++){ //最初の多角形の座標
             work = (2*i+1) * Math.PI/poly;
             x[i] = Math.sin(work);
             y[i] = Math.cos(work);
          }
       }

       public void paint(Graphics g){
          double work;
          calc();
          for(int i=0; i<number; i++){
              g.drawPolygon(transX(x), transY(y), poly);
              //次の多角形の座標計算
              for(int k=0; k<poly; k++){
                work =x[k];
                x[k] = (work*Math.cos(angle) - y[k]*Math.sin(angle))*c;
                y[k] = (work*Math.sin(angle) + y[k]*Math.cos(angle))*c;
              }
            }
        }

       public int[] transX(double n[]){
           int tx[];
           tx = new int[poly];
           for(int i=0; i<poly; i++){
             tx[i] = (int)(n[i]*w/2 + w/2);
           }
           return tx;
       }
      public int[] transY(double n[]){
           int ty[];
           ty = new int[poly];
           for(int i=0; i<poly; i++){
              ty[i] = (int)(n[i]*h/2 + h/2);
           } 
           return ty;
       }
    }
}
