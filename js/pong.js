
var can= document.getElementById("can");
var ctx= can.getContext("2d");
var c = 16;
var w = can.width;
var h =can.height;
var colJoueur2 = w-3*c;
var colJoueur1 = c*2 ;
var colHaut = c*2;
var colBas= h-c*2;
var speedB = 7;
var speedJ = 10;

var cpt=0;

var matchWin = 9;

var etat = "titre";

drawRect=function(x,y,xx,yy){
       
        ctx.fillStyle="white";
        ctx.fillRect(x,y,xx,yy);
}

gameOver=function(winner){
    ctx.clearRect(0,0,w,h);
    drawTerrain(1);
    matrice1.drawMatrice(joueur1.points,3);
    matrice2.drawMatrice(joueur2.points,3);
    joueur1.points=0;
    joueur2.points=0;
    ctx.font = "40px sans-serif"
    ctx.fillText(winner,250,350);
    ctx.font = "20px sans-serif"
    ctx.fillText("- press space to continu -",300,450);
    etat="titre";
}

drawTerrain=function(on){
    drawRect(c,c,w-c*2,c);
    drawRect(c,h-c*2,w-c*2,c);
        if(!on){
        for(i=0;i<(h/16)-5;i++){
            if(i%2){
                drawRect(400,c*2+c*i,c,c);
            }
        
        }
    }
}

ClssMatrice=function(x){
    this.x=x;
    this.y=c*3;

    this.title=[
        
            [1,1,1,1,0,1,1,1,1,0,1,0,0,1,0,1,1,1,1,0,1,0,0,0],
            [1,0,0,1,0,1,0,0,1,0,1,1,0,1,0,1,0,0,0,0,1,0,0,0],
            [1,0,0,1,0,1,0,0,1,0,1,0,1,1,0,1,0,1,1,0,1,0,0,0],
            [1,1,1,1,0,1,0,0,1,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0],
            [1,0,0,0,0,1,1,1,1,0,1,0,0,1,0,1,1,1,1,0,1,0,0,0]
    ]

    this.matrice=[
        [
        [1,1,1],
        [1,0,1],
        [1,0,1],
        [1,0,1],
        [1,1,1]],
        [
            [0,1,0],
            [1,1,0],
            [0,1,0],
            [0,1,0],
            [0,1,0]],
            [
                [1,1,1],
                [0,0,1],
                [0,1,0],
                [1,0,0],
                [1,1,1]],
                [
                    [1,1,1],
                    [0,0,1],
                    [0,1,0],
                    [0,0,1],
                    [1,1,1]],
                    [
                        [1,0,0],
                        [1,0,1],
                        [1,1,1],
                        [0,0,1],
                        [0,0,1]],
                        [
                            [1,1,1],
                            [1,0,0],
                            [1,1,1],
                            [0,0,1],
                            [1,1,1]],
                            [
                                [1,0,0],
                                [1,0,0],
                                [1,1,1],
                                [1,0,1],
                                [1,1,1]],
                                [
                                    [1,1,1],
                                    [0,0,1],
                                    [0,1,0],
                                    [0,1,0],
                                    [0,1,0]],
                                    [
                                        [1,1,1],
                                        [1,0,1],
                                        [1,1,1],
                                        [1,0,1],
                                        [1,1,1]],
                                        [
                                            [1,1,1],
                                            [1,0,1],
                                            [1,1,1],
                                            [0,0,1],
                                            [0,0,1]]
                                        ];


    this.drawMatrice=function(pointsJoueur, x){
        for(i=0;i<5;i++){
            for(j=0;j<x;j++){
                if(this.matrice[pointsJoueur][i][j]){
                    drawRect(this.x+c*j,this.y+c*i,c,c);
                }

                
            }
        }



        
    }

    this.drawTitle=function(){
        drawTerrain(1);
        for(i=0;i<5;i++){
            for(j=0;j<24;j++){
                if(this.title[i][j]){
                    drawRect(this.x+c*j,c*10+this.y+c*i,c,c);
                }}}}


}

ClssJoueur=function(x){

    this.x=x;
    this.y=300;
    this.sy=0;
    this.points=0;
    this.long=c*5;

    this.moveJoueur=function(){
        this.y+=this.sy*speedJ;
        if(this.y<colHaut)this.y=colHaut;
        if(this.y+this.long>colBas)this.y=colBas-this.long;
        drawRect(this.x,this.y+this.sy,c,this.long)
    }
}

ClssBalle=function(x,y){

    this.x=x;
    this.y=y;
    this.sx=1;
    this.sy=0;
  
    this.moveBalle=function(){
        this.x+=speedB*this.sx;
        this.y+=speedB*this.sy;
cpt++;

        if(this.y+c>colBas||this.y<colHaut){this.sy*=-1;son1.play()}
       
        if(cpt>10){
            
        if(this.x<colJoueur1&&
            this.x>colJoueur1-speedB*2 &&
            this.y+c>joueur1.y&&
            this.y<joueur1.y+joueur1.long
            ){
                cpt=0;
                son2.play()
                this.sx*=-1;
                col=this.y+c/2-joueur1.y;
                demi=joueur1.long/2+c/2
                if(col<=demi)this.sy=((demi-col)*2)/-demi;
                if(col>demi)this.sy=((col-demi)*2)/demi;
                }
            
            if(this.x>colJoueur2&&
            this.x<colJoueur2+speedB*2 &&
            this.y+c>joueur2.y&&
            this.y<joueur2.y+joueur2.long){
    
                cpt=0;
                son2.play()
                this.sx*=-1;
                col=this.y+c/2-joueur2.y;
                demi=joueur2.long/2+c/2
                if(col<=demi)this.sy=((demi-col)*2)/-demi;
                if(col>demi)this.sy=((col-demi)*2)/demi;          
                }

        if(this.x<0){son3.play();cpt=0;joueur2.points++;balle.sy=1;balle.x=w/2;balle.y=colHaut;}
        if(this.x>w){son3.play();cpt=0;joueur1.points++;balle.sy=1;balle.x=w/2;balle.y=colHaut;}
        }
        drawRect(this.x,this.y,c,c);
        }
}

joueur1 = new ClssJoueur(c);
joueur2 = new ClssJoueur(w-c*2);
matrice1 = new ClssMatrice(w/2-c*7);
matrice2 = new ClssMatrice(w/2+c*5);
titreMatrice= new ClssMatrice(250);
balle = new ClssBalle(100,300);

 document.addEventListener("keydown", pressee, true);
 function pressee(x){
    switch (x.key){
        case "ArrowUp" : joueur2.sy=-1; break;
        case "ArrowDown" : joueur2.sy=1; break;
        case "a" : joueur1.sy=-1; break;
        case "q" : joueur1.sy=1;break;
     }
    
 }

 document.addEventListener("keyup", relachee, true);
 function relachee(x){
    switch (x.key){
        case "ArrowUp" :
            if(joueur2.sy==-1)joueur2.sy=0;
            break;
        case "ArrowDown" :   
            if(joueur2.sy==1)joueur2.sy=0;
            break;
        case "a" :
            if(joueur1.sy==-1)joueur1.sy=0;
            break;
        case "q" :   
            if(joueur1.sy==1)joueur1.sy=0;
            break;
    
                }
                if(event.code=="Space" && etat!=="jeu"){
                    etat="jeu";
                    jeu();
                    son.play();
                }
    }

jeu=function(){ 

    ctx.clearRect(0,0,w,h);

    balle.moveBalle();
    joueur2.moveJoueur();
    joueur1.moveJoueur();
    drawTerrain();
    matrice1.drawMatrice(joueur1.points,3);
    matrice2.drawMatrice(joueur2.points,3);

    if(joueur1.points==matchWin||joueur2.points==matchWin){
       joueur1.points== matchWin ? gameOver("PLAYER I WINS !") : gameOver("PLAYER II WINS !");
    }else requestAnimationFrame(jeu);
        
}

titreMatrice.drawTitle();
ctx.font = "20px sans-serif"
ctx.fillText("players control : A Q / UP DOWN",260,400);
ctx.fillText("- press space to play -",320,450);


var son2 = new Audio("./snd/snd1.wav");
var son1 = new Audio("./snd/snd2.wav");
var son3 = new Audio("./snd/snd3.wav");


