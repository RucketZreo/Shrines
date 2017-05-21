module Callback
  def setup &block
    @setup ||= []
    @setup << block
  end

  def before &block
    @before ||= []
    @before << block
  end

  def after &block
    @after ||= []
    @after << block
  end

  def run
    @setup.each(&:call)
    @before.each(&:call)
    yield
    @after.each(&:call)
  end
end

class CallbackExample
  extend Callback
  setup do
    @a = 1
  end

  before do
    @a += 1
    puts "@a: #{@a}"
  end
  after do
    puts "done"
  end

  run do
    puts "FFF";
  end
end

CallbackExample
