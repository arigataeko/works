// �ڹ�¤ 
// ��swing�� ���˥᡼�������ڤ���Ĺ

 import java.awt.*; 
 import java.awt.event.*;  
 import java.applet.Applet; 

 public class Tree extends Applet{
    InputP ip;            //
    DrawArea da;
    double scale;      // ��Ļޤ���Ψ 
    int angle;          // �ޤι�������� 
    int n;               // �����֤���� 
    double stand,len;    // �ǽ�λޤ��������ޤ�Ĺ�� 
    int w,h; 
    Color treeColor;
    boolean grow = false; //��Ĺ�� true
    public void init() {   // ���ץ�åȤν�����᥽�å� 
       scale=0.7;      // ��Ļޤ���Ψ �����
       angle=30;       // �ޤι�������� �����
       n=1;            // �����֤���� 
       stand=90;
       len=80;    // �ǽ�λޤ�Ĺ�� 
       w=getSize().width;               // ��
       h=getSize().height;              // �⤵

        treeColor = new Color(0,102,0);
        FlowLayout layout = new FlowLayout();
        setLayout(layout);    //��������������
        ip = new InputP();     //���ϥѥͥ����
        da = new DrawArea(w,h-40);  //�����Х�����
        add(da);        //�����Х�������
        add(ip);              //���ϥѥͥ������
        setBackground(treeColor);
    }   

    //�ܥ�����֤��ѥͥ�
    class InputP extends Panel implements ActionListener,ItemListener { 
       Button goB;            //����ܥ���
       Choice scaleC, angleC, nC;  // ����

       InputP(){
         setBackground(treeColor);
         setForeground(Color.white);

         scaleC = new Choice();  // ��Ļޤ���Ψ������ 
         scaleC.setBackground(treeColor);
         for (double d=1.0; d>=0.5; d=d-0.05) { 
            scaleC.addItem((d+0.001+" ").substring(0,4)); 
         } 
         scaleC.select(String.valueOf(scale)+ "0");  //�����

         angleC = new Choice();  // �ޤι�������٤����� 
         angleC.setBackground(treeColor);
         for (int i=20; i<=90; i+=5) {    
            angleC.addItem(""+i); 
         } 
         angleC.select(String.valueOf(angle));

         nC = new Choice();      // �����֤���������� 
         nC.setBackground(treeColor);
         for (int i=1; i<=20; i++) {  
            nC.addItem(""+i); 
         } 
         nC.select(String.valueOf(n));

         goB=new Button("����"); // ����ܥ��� 
         goB.setBackground(treeColor);
         //���٥�ȥꥹ�ʡ�������
         scaleC.addItemListener(this);     
         angleC.addItemListener(this);     
         nC.addItemListener(this);     
         goB.addActionListener(this); 
         //����
         Label nagasaL = new Label("�ޤ���Ψ");  
         nagasaL.setBackground(treeColor);
         add(nagasaL); 
         add(scaleC);
         Label kakudoL = new Label("�ޤγ���"); 
         kakudoL.setBackground(treeColor);
         add(kakudoL); 
         add(angleC);
         Label kaisuL = new Label("��Ĺ���"); 
         kaisuL.setBackground(treeColor);
         add(kaisuL);
         add(nC);
         add(goB);
      } 
      public void actionPerformed(ActionEvent e) { // �ܥ��� 
         if(e.getSource() == goB) {  
            if(!grow) { da.start(); }
         }
      }
      public void itemStateChanged(ItemEvent e) { // ���祤�� 
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

    //�޷������������Х�
    class DrawArea extends Canvas implements Runnable{
       int w, h;
       static final double RAD=Math.PI/180.0;  // �饸������Ѵ����뤿�����

       Thread growThread;
       int kaisu=1;
       int interval=500;
       Image offImage;
       Graphics offg;
       DrawArea(int w, int h){  //���󥹥ȥ饯��
          setSize(w, h);   //�����Х����礭��������
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
          offg.setColor(Color.white);  // �طʿ� 
          offg.fillRect(0,0,w,h);      // �ط� 
          offg.setColor(treeColor); // �������� 
          rtree(offg,kaisu,w/2,0,len,stand);        // �ڤ����� 
          g.drawImage(offImage, 0,0,this);
      }
      //�ڤ�Ƶ�Ū������
      public void rtree(Graphics g, int nn, double x0, double y0, 
                                                double len,double stand){ 
	  //         if (nn <= 0) { return; } 
         double x,y; 
         x=len*Math.cos(RAD*stand)+x0;            //�����x��ɸ
         y=len*Math.sin(RAD*stand)+y0;            //�����y��ɸ
         g.drawLine((int)x0,(int)(h-y0),(int)x,(int)(h-y)); 
         if(nn>1){
           rtree(g,nn-1,x,y,len*scale,stand-angle); //���α��λ� 
           rtree(g,nn-1,x,y,len*scale,stand+angle); //���κ��λ� 
         }
       } 
     }
}  

