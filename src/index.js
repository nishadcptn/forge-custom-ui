import Resolver from '@forge/resolver';
import api, { route, fetch } from "@forge/api";

const resolver = new Resolver();

resolver.define('getUserInfo', async(req) => {
    console.log("------------------>",req);
    const res = await api
    .asUser()
    .requestJira(route`/rest/api/3/myself`);
    // console.log(await res);
    
    return await res.json();
    // return 'Hello worldjjh!';
});


resolver.define('bulk', async(req)=>{
    const response = await api.asUser().requestJira(route`/rest/api/2/users/search?accountType`, {
        headers: {
          'Accept': 'application/json'
        }
    });
    // console.log(await response.json());
    return await response.json();
});

resolver.define('group', async(req)=> {
    const response = await api.asUser().requestJira(route`/rest/api/2/groups/picker`, {
        headers: {
          'Accept': 'application/json'
        }
    });
    console.log(await response.json());
    return await response.json();
})

resolver.define('projects', async(req)=> {
      
      const response = await api.asApp().requestJira(route`/rest/api/3/myself?expand=groups`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      console.log(">>>>>>>>>>>>>>",await response.json());
      return await response.json();
})

// resolver.define('projects', async(req)=> {
      
//     const response = await api.asUser().requestJira(route`/rest/api/2/project`, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//       },
//     });
//     console.log(await response.json());
//     return await response.json();
// })

export const handler = resolver.getDefinitions();

