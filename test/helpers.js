import expect from 'expect';
import proxyquire from 'proxyquire';
import { Map } from 'immutable';

// Custom assertions
expect.extend({
  toHaveActionOfType(expected) {
    expect.assert(
      this.actual.filter((action) => {
        return action.type === expected;
      }).length > 0,
      'Expected dispatched actions to have action %s',
      expected
    );

    return this;
  }
});

expect.extend({
  notToHaveActionOfType(expected) {
    expect.assert(
      this.actual.filter((action) => {
        return action.type === expected;
      }).length === 0,
      'Expected dispatched actions not to have action %s',
      expected
    );

    return this;
  }
});

export function requireWithMockConfigHelper(requirePath, modulePath, stub) {
  return proxyquire(requirePath, {
    [modulePath]: {
      conf: Map(stub),
      '@noCallThru': true
    }
  });
}

export function makeLocalForageStub() {
  const store = {};
  return {
    store,
    getItem: (key) => {
      return new Promise((resolve) => setTimeout(resolve, 1))
        .then(() => {
          if (key in store) {
            const value = store[key];
            if (value instanceof Error) {
              throw value;
            } else {
              return value;
            }
          } else {
            return null;
          }
        });
    },
    setItem: (key, value) => {
      return new Promise((resolve) => setTimeout(resolve, 1))
        .then(() => {
          store[key] = value;
        });
    },
    removeItem: (key) => {
      return new Promise((resolve) => setTimeout(resolve, 1))
        .then(() => {
          if (key in store && store[key] instanceof Error) {
            throw store[key];
          } else {
            delete store[key];
          }
        });
    },
    clear: () => {
      for (const key of Object.keys(store)) {
        delete store[key];
      }
    }
  };
}
