//Testcase context function
export function testcase(meta, callback) {
  const tags = meta.tags || [];
  const id = meta.id ?? 'NO-ID';
  describe(`[${id}]`, { tags }, callback);
}

