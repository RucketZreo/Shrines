// resource: https://medium.com/programmers-blockchain/create-simple-blockchain-java-tutorial-from-scratch-6eeed3cb03fa
use std::time::{Duration, Instant};
use std::hash::{Hash, Hasher};
use std::collections::hash_map::DefaultHasher;
use std::string::*;

#[derive(Debug, Hash)]
struct Block<'a> {
    hash: &'a str,
    previous_hash: &'a str,
    data: &'a str,
    timestamp: i64,
}

fn signature<T: Hash> (t: T) -> u64 {
    let mut s = DefaultHasher::new();
    t.hash(&mut s);
    s.finish()
}

impl<'a> Block<'a> {
    fn new() -> Block<'a> {
        Block {
            hash: "test",
            previous_hash: "test",
            data: "data",
            timestamp: (Instant::now().elapsed().as_secs() as i64)
        }
    }

    fn calc_hash(input: &Block) -> String {
        let mut s: String = signature(&input).to_string();
        s = s + &((Instant::now().elapsed().as_secs() as i64).to_string());
        s
    }
}

fn main () {
    let mut block = Block::new();
    println!("Hash: {:?}", signature(block));
}
