/**
 * 手写 promise.all
 * @param {Array<Promise>} promiseIterator 
 * @returns {Promise} 
 */
const promiseAll = (promiseIterator) => {
  let res, rej;
  
  const p = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  })
  
  const result = [];
  let count = 0;
  let resolve_count = 0; // 完成的计数器

  for(promiseItem of promiseIterator) {
    let i = count;
    count++;
    Promise.resolve(promiseItem).then(data => {
      resolve_count++;
      result[i] = data;
      
      if(resolve_count === count) {
        res(result);
      }
    }).catch(err => {
      rej(err);
    })
  }

  if(count === 0) {
    res(result);
  }

  return p;
}

// 测试 数据
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.reject(3);


promiseAll([promise1, promise2, promise3])
  .then((results) => {
    console.log(results); // 输出: [1, 2, 3]
  })
  .catch((error) => {
    console.error(error);
  });