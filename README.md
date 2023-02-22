# Bus Stop App - React Native & Expo Go


## Descrição da aplicação:
O projeto é um aplicativo em React Native, utilizando a biblioteca Expo Go capaz de capturar a localização do dispotivo e mostrar os pontos de ônibus mais próximos de sua localização. O desafio proposto consiste em desenvolver uma tela inicial, demonstrando apenas um Mapa com  nenhuma outra informação além de um botão de ligar e desligar que, ao pressionado, devolvesse as informações dos pontos de ônibus mais próximos.
<br>

## Ferramentas utilizadas:
Foram utilizadas as seguintes tecnologias no desenvolvimento do projeto:

- React Native
- Expo Go
- TypeScript
- Axios
- React Native Maps
- Expo Location

<br>

## Inicialização da aplicação via terminal:
Para inicio da aplicação basta utilizar-se dos seguintes comandos:

 ```
 git clone https://github.com/felipecro28/bus-stop
 cd bus-stop
 npm install
 npm start
 ```

 Para compartilhar o servidor com outras pessoas, pode ser utilizado o mecanismo de tunnel do próprio Expo Go. Para isso, digite em seu terminal

```
npx expo start --tunnel
```


 ## Integração com a API

 Para utilizar os serviços deste APP, é necessário seguir os seguintes passos.

 - Obtenha uma chave de acesso á TOMTOM API [aqui](https://developer.tomtom.com/).
 - Crie um arquivo .env na raíz do seu projeto
 - Atribua a variável de ambiente API_KEY o valor de sua chave.

 Ex:

 ```
    API_KEY='YOUR_API_KEY_GOES_HERE'
 ```

 Para contribuir com este projeto, siga estas etapas:
  >- Bifurque este repositório.
  >- Crie um branch: `git checkout -b <nome_branch>`.
  >- Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
  >- Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
  >- Crie a solicitação de pull.
  
*Consulte a documentação do GitHub em* [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).