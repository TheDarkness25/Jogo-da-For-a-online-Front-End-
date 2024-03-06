class User {
    constructor() {
        this.getUserInfo()
    }

    getUserInfo() {
        const request = new XMLHttpRequest();
        request.open('GET', '/user-info', false); 
        request.send(null);

        if (request.status === 200) {
            const user = JSON.parse(request.response)
            this.ativo = user.ativo
            this.email = user.email
            this.id = user.id
            this.qtdMoedas = user.qtdMoedas
            this.qtdVidas = user.qtdVidas
            this.username = user.username
        }
    }
  }

  export { User };