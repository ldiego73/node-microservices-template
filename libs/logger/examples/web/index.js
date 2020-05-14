document.addEventListener('DOMContentLoaded', () => {
  const l = Logger.create('console');

  Logger.showTimestamp = true;

  l.log('Hello World', { status: true, id: 1 });
  l.info('Hello World', { status: true, id: 1 });
  l.debug('Hello World', { status: true, id: 1 });
  l.warn('Hello World', { status: true, id: 1 });
  l.error('Hello World', { status: true, id: 1 });
});
