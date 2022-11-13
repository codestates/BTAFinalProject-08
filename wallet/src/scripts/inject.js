class InjectMintChoco {
  static startProxy(mintChoco, eventListener, msg) {
    eventListener.addMessageListener((e) => {
      console.log(msg, e);
    });
  }
  getKey = async (chainId) => await console.log(this);
}

const mincho = new InjectMintChoco();
console.log(mincho, 'mincho');

window.mint = mincho;
