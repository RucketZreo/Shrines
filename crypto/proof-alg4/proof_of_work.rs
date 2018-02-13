// resource: https://medium.com/programmers-blockchain/create-simple-blockchain-java-tutorial-from-scratch-6eeed3cb03fa

use std::option::*;
use std::time::*;

#[derive(Debug)]
struct Block {
    timestamp: Option<Duration>,
    data: Option<String>,
    previous_hash: Option<String>,
    hash: Option<String>
}

impl Block {
    fn new(data: Option<_>, previous_hash: Option<_>) -> Block {
        Block {
            data: Some(data)
            previous_hash: Some(previous_hash)
            timestamp: Some(Instant::now().elapsed()),
            hash: None
        }
    }
}

fn main () {
    let block = Block::new(String::from("pow"), None);
    println!("block: {:?}", block);
}