describe('pubSub', function () {
  var sub, pub, cb;
  beforeEach(function () {
    cb = function () {};
    cb1 = function () {};
    sub = pubSub.subscribe();
    pub = pubSub.publish();
  });
  describe('subscribe', function () {
    it('should be able to get list of subscribers', function () {
      sub.add('name', cb);
      sub.add('name', cb1);
      expect(sub.get()).toEqual({name: [cb, cb1]});
    });
  });
  describe('Publish', function () {
    it('should have a publish.notify function', function () {
      expect(pub.notify).toBeDefined();
    });
  });
  it('should notify subscribe when publish is called', function () {
    var spy1 = jasmine.createSpy('bob', cb);
    var spy2 = jasmine.createSpy('bob1', cb1);
    sub.add('words', spy1);
    sub.add('words1', spy2);
    pub.notify('words');
    console.log(sub.get());
    expect(spy1).toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
  });

  it('should not notify subscribers when pubhlish is called,', function () {
    var spy = jasmine.createSpy('bob', cb);
    sub.add('words', spy);
    pub.notify('words1');
    expect(spy).not.toHaveBeenCalled();
  });
});
