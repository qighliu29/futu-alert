# futu-alert

🛎**futu-alert** is a SPA used to monitor ticker trend with support of [futuquant](https://github.com/FutunnOpen/futuquant)

## features

- Desktop notification(with sound playing🎧)
- Auto merging identical ticker(potential)
- Donut🍩 chart show BUY/SELL power

![Image of Donut](https://github.com/qighliu29/futu-alert/screenshots/donut.png)

## usage

1. deploy the server(big-ticker.py), you should have [futuquant](https://github.com/FutunnOpen/futuquant) installed and a websocket library written in Python, I used [simple-websocket-server](https://github.com/dpallot/simple-websocket-server), don't forget specify your own websocket port in script
1. run "yarn start" in root dir, type in your server address and port in the popup, the indicator located in right top should turn green and blink if nothing wrong
1. click the table row(if you receive some data from server) to show the donut chart

## thanks to

- [futuquant](https://github.com/FutunnOpen/futuquant)
- [simple-websocket-server](https://github.com/dpallot/simple-websocket-server)
- [JQuery](https://jquery.com/)
- [Bootstrap](getbootstrap.com)
- [Bootswatch](https://bootswatch.com/)
- [Bootstrap Table](bootstrap-table.wenzhixin.net.cn)
- [Font Awesome](fontawesome.io)
- [Vue.js](https://cn.vuejs.org/index.html)
- [Vuex](https://vuex.vuejs.org)
- [howler.js](https://howlerjs.com/)
- [Push](https://pushjs.org/)
- [Moment.js](https://momentjs.com/)
- [D3.js](https://d3js.org/)