import React from "react";

function page() {
  function measureTime(func) {
    const start = performance.now();
    const end = performance.now();
    return end - start;
  }

  function eggDrop(n,k)
    {
     
        // If there are no floors, then 
        // no trials needed. OR if there 
        // is one floor, one trial needed. 
        if (k == 1 || k == 0)
            return k; 
         
        // We need k trials for one egg 
        // and k floors 
        if (n == 1)
            return k; 
         
        let min = Number.MAX_VALUE;
        let x, res; 
         
        // Consider all droppings from 
        // 1st floor to kth floor and 
        // return the minimum of these 
        // values plus 1.
        for (x = 1; x <= k; x++)
        {
            res = Math.max(eggDrop(n - 1, x - 1), 
                           eggDrop(n, k - x)); 
            if (res < min)
                min = res;
        }
        return min + 1;
    }

    function max(a,b)
{
    return (a > b) ? a : b;
}
 
/* Function to get minimum number
 of trials needed in worst
    case with n eggs and k floors */
function eggDrop2(n,k)
{
    /* A 2D table where entry eggFloor[i][j]
 will represent minimum number of trials
needed for i eggs and j floors. */
        let eggFloor = new Array(n + 1);
        for(let i=0;i<(n+1);i++)
        {
            eggFloor[i]=new Array(k+1);
        }
        let res;
        let i, j, x;
  
        // We need one trial for one floor and
        // 0 trials for 0 floors
        for (i = 1; i <= n; i++) {
            eggFloor[i][1] = 1;
            eggFloor[i][0] = 0;
        }
  
        // We always need j trials for one egg
        // and j floors.
        for (j = 1; j <= k; j++)
            eggFloor[1][j] = j;
  
        // Fill rest of the entries in table using
        // optimal substructure property
        for (i = 2; i <= n; i++) {
            for (j = 2; j <= k; j++) {
                eggFloor[i][j] = Number.MAX_VALUE;
                for (x = 1; x <= j; x++) {
                    res = 1 + max(
                                  eggFloor[i - 1][x - 1],
                                  eggFloor[i][j - x]);
                    if (res < eggFloor[i][j])
                        eggFloor[i][j] = res;
                }
            }
        }
  
        // eggFloor[n][k] holds the result
        return eggFloor[n][k];
}

  return (
    <>
      <div>brute: {measureTime(() => eggDrop(3, 9))}</div>
      <div>dynamic: {measureTime(() => eggDrop2(3, 9))}</div>
    </>
  );
}

export default page;
