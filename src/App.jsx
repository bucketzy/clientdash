import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

const clients = [
  {
    username: "acme",
    password: "demo123",
    name: "Acme Media",
    workflows: [
      { name: "Lead Follow-Up", status: "Active", platform: "Make.com" },
      { name: "DM Auto-Reply", status: "Paused", platform: "Meta API" },
      { name: "Website Chatbot", status: "Active", platform: "OpenAI" }
    ],
    connections: [
      { name: "Google Sheets", status: "Connected" },
      { name: "Instagram DMs", status: "Connected" },
      { name: "Email (SMTP)", status: "Disconnected" }
    ]
  },
  {
    username: "bright",
    password: "dental456",
    name: "Bright Dental",
    workflows: [
      { name: "Review Request Flow", status: "Active", platform: "Make.com" },
      { name: "Missed Call SMS", status: "Active", platform: "Twilio" }
    ],
    connections: [
      { name: "Google My Business", status: "Connected" },
      { name: "Twilio", status: "Connected" }
    ]
  }
];

export default function ClientDashboard() {
  const [loggedInClient, setLoggedInClient] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("workflows");

  const handleLogin = () => {
    const found = clients.find(
      (c) => c.username === username && c.password === password
    );
    if (found) setLoggedInClient(found);
    else alert("Invalid credentials");
  };

  if (!loggedInClient) {
    return (
      <div className="p-6 max-w-sm mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Client Login</h1>
        <input
          className="mb-3 w-full p-2 rounded border border-gray-300"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="mb-3 w-full p-2 rounded border border-gray-300"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">{loggedInClient.name} Dashboard</h1>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows">
          <div className="grid gap-4">
            {loggedInClient.workflows.map((flow, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold">{flow.name}</h2>
                      <p className="text-sm text-muted-foreground">Platform: {flow.platform}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      flow.status === "Active" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                    }`}>
                      {flow.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connections">
          <div className="grid gap-4">
            {loggedInClient.connections.map((conn, i) => (
              <Card key={i}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{conn.name}</h2>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    conn.status === "Connected"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}>
                    {conn.status}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
