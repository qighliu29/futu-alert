# -*- coding: utf-8 -*-

from futuquant.open_context import *
from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket

clients = []

class TickerTest(TickerHandlerBase):
    """
    获取逐笔推送数据
    """

    def on_recv_rsp(self, rsp_str):
        """数据响应回调函数"""
        ret_code, content = super(TickerTest, self).on_recv_rsp(rsp_str)
        if ret_code != RET_OK:
            print("TickerTest: error, msg: %s" % content)
            return RET_ERROR, content
        # print("TickerTest\n", content)
        if int(content.volume[0]) > 9999: 
            print(content, "\n")
            for client in clients:
                client.sendMessage(content.to_json())
        return RET_OK, content

class AlertBigDeal(WebSocket):

    def handleMessage(self):
        print(self.address, ': ' + self.data)

    def handleConnected(self):
        print(self.address, ' - connected')
        clients.append(self)

    def handleClose(self):
        print(self.address, ' - disconnected')
        clients.remove(self)

if __name__ == "__main__":
    quote_context = OpenQuoteContext(host='127.0.0.1', port=11111)

    print(quote_context.get_global_state())
    # quote_context.set_handler(HeartBeatTest())

    # 获取推送数据
    quote_context.subscribe('US.UWT', "TICKER", push=True)
    quote_context.set_handler(TickerTest())

    quote_context.subscribe('US.DWT', "TICKER", push=True)
    quote_context.set_handler(TickerTest())

    quote_context.start()
    print("recv thread started\n")

    server = SimpleWebSocketServer('', port, AlertBigDeal)
    server.serveforever()
