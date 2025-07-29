// ��������12.4 �ڤΥե饯���른���ͥ졼��
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
   JButton goB;            //����ܥ���
   JComboBox scaleC, angleC, nC;  // ����

   InputP(TreeGenerator t){
      top = t;
      setBackground(Color.white);
      scaleC = new JComboBox();  // ��Ļޤ���Ψ������ 
      for (double d=0.8; d>=0.5; d=d-0.05) { 
            scaleC.addItem((d+0.001+" ").substring(0,4)); 
      } 
      angleC = new JComboBox();  // �ޤι�������٤����� 
      for (int i=30; i<=90; i+=10) {    
         angleC.addItem(""+i); 
      } 
      nC = new JComboBox();      // �����֤���������� 
      for (int i=1; i<=20; i++) {  
         nC.addItem(""+i); 
      } 
      goB=new JButton("����"); // ����ܥ��� 
      //���٥�ȥꥹ�ʡ�������
      scaleC.addActionListener(this);
      angleC.addActionListener(this);
      nC.addActionListener(this);
      goB.addActionListener(this); 
      //����
      add(new Label("�ޤ���Ψ"));  
      add(scaleC);
      add(new Label("�ޤγ���")); 
      add(angleC);
      add(new Label("��Ĺ���"));
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
    double scale;      // ��Ļޤ���Ψ 
    int angle;          // �ޤι�������� 
    int n;               // �����֤���� 
    double stand,len;    // �ǽ�λޤ��������ޤ�Ĺ�� 
    int w,h; 
    final double RAD=Math.PI/180.0;  // �饸������Ѵ����뤿�����

    Tree() {   // ������᥽�å� 
       setBorder(BorderFactory.createMatteBorder(3,3,3,3,Color.green));
       setMinimumSize(new Dimension(300, 300));  //�Ǿ�������������
       setPreferredSize(new Dimension(300, 300));//˾�ॵ����������
       scale=0.8;      // ��Ļޤ���Ψ 
       angle=30;       // �ޤι�������� 
       n=1;            // �����֤���� 
       stand=90;
       len=100;    // �ǽ�λޤ�Ĺ�� 
    }   

    public void paintComponent(Graphics g) { 
       w=getSize().width;               // ��
       h=getSize().height;              // �⤵
       g.setColor(Color.white);  // �طʿ� 
       g.fillRect(0,0,w,h);            // �ط� 
       g.setColor(new Color(100, 153, 0));  // �������� 
       drawTree(g,n,w/2,0,len,stand);        // �ڤ����� 
    }
    
    //�ڤ�Ƶ�Ū������
    void drawTree(Graphics g, int nn, double x1, double y1, 
                                                double len,double stand){ 
       double x2,y2; 
       x2=len*Math.cos(RAD*stand)+x1;            //�����x��ɸ
       y2=len*Math.sin(RAD*stand)+y1;            //�����y��ɸ
       g.drawLine((int)x1,(int)(h-y1),(int)x2,(int)(h-y2)); 

       if(nn>1){
       drawTree(g,nn-1,x2,y2,len*scale,stand-angle); //���α��λ� 
       drawTree(g,nn-1,x2,y2,len*scale,stand+angle); //���κ��λ� 
       }
     } 
}



