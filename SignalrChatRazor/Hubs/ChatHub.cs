using Microsoft.AspNetCore.SignalR;

namespace SignalrChatRazor.Hubs;

public class ChatHub : Hub
{
    public Task SendGood(string data)
    {
        return Clients.All.SendAsync("SendGood", data);
    }

    public Task SendBad(string data) =>
        Clients.All.SendAsync("SendBad", data);
}
