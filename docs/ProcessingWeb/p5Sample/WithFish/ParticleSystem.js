class ParticleSystem {
  constructor(position) {
    this.origin = position.copy(); //positionはベクトル x, y,zの座標情報をもつ
    this.particles = [];
  }

  addParticle () {
    this.particles.push(new Particle(this.origin));  //配列particlesの最後に要素を追加
  }

  run () {
    for (let i = this.particles.length-1; i >= 0; i--) {
      let p = this.particles[i];
      p.run();
      if (p.isDead()) {
        this.particles.splice(i, 1);  //配列particlesのインデックスiから1個の要素を削除
      
      }
    }
  }
}
