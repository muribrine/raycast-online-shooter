// deno-lint-ignore-file no-explicit-any
function set_up_routing(express_app: any, __dirname: any, ROUTES: string[][]) {
 
    ROUTES.forEach(route => {
      
      const req: string = route[0];
      const res: string = route[1];
  
      express_app.get(req, (_: any, response: any) => {
        console.log(`Got a request for ${req}.`);
        response.sendFile(__dirname + res);
      });
  
    });
  
};
  
export { set_up_routing };