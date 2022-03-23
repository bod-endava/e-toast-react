type ArgsIfFn<A> = A extends (...args: infer Args) => any ? Args : [never]
type ApplyIfFn<A> = A extends (...args: any) => infer Ret ? Ret : A

export type Either<L,R> = {
    map<R0>(fn: (r: R) => R0): Either<L,R0>;
    mapTo<R0>(val: R0): Either<L,R0>;
    mapLeft<L0>(fn: (l: L) => L0): Either<L0,R>;
    mapLeftTo<L0>(val: L0): Either<L0,R>;
    flatMap<L0,R0>(fn: (r: R) => Either<L0, R0>): Either<L | L0, R0>;
    onLeft<L0>(fn: (l: L) => L0): L0 | R;
    zipLeft<L0,R0>(other: Either<L0,R0>): Either<L | L0,R>
    zipRight<L0,R0>(other: Either<L0,R0>): Either<L | L0,R0>
    zip<L0,R0>(other: Either<L0,R0>): Either<L0 | L, [R, R0]>
    apply(...args: ArgsIfFn<R>): Either<L, ApplyIfFn<R>>
}

export const right = <L,R>(x: R): Either<L,R> => ({
    map(fn){
      return right(fn(x))
    },
    mapTo(val){
      return right(val)
    },
    mapLeft(){
        return right(x);
    },
    mapLeftTo(){
        return right(x);
    },
    flatMap(fn){
        return fn(x)
    },
    onLeft(){
      return x;
    },
    zipLeft<L0,R0>(other: Either<L0,R0>): Either<L | L0, R> {
      return this.flatMap(r => other.mapTo(r))
    },
    zipRight<L0,R0>(other: Either<L0,R0>): Either<L | L0,R0> {
      return this.flatMap(() => other)
    },
    zip<L0,R0>(other: Either<L0,R0>): Either<L0 | L, [R, R0]> {
      return this.flatMap(r => other.map(r0 => [r,r0]))
    },
    apply(...args){
      return this.map(r => r instanceof Function ? r(...args) : r)
    }
})
  
export const left = <L,R>(x: L): Either<L,R> => ({
    map(){
      return left(x)
    },
    mapTo(){
      return left(x)
    },
    mapLeft(fn){
      return left(fn(x))
    },
    mapLeftTo(val){
      return left(val)
    },
    flatMap(){
      return left(x)
    },
    onLeft<U>(fn: (x: L) => U){
      return fn(x);
    },
    zipLeft<L0>(): Either<L | L0, R> {
      return this
    },
    zipRight<L0,R0>(): Either<L | L0, R0> {
      return this as unknown as Either<L | L0, R0>
    },
    zip<L0,R0>(): Either<L0 | L, [R, R0]> {
      return this as unknown as Either<L0 | L, [R, R0]>
    },
    apply(..._args: ArgsIfFn<R>): Either<L, ApplyIfFn<R>>{
      return this as unknown as Either<L, ApplyIfFn<R>>
    },
})

type Predicate<A,B extends A> = (x: A) => x is B 
export const fromPredicate = <L,R>(fn: Predicate<L | R, R>, x: L | R): Either<L,R> => 
    fn(x) ? right(x) : left(x)

export const fromBoolean = (x: boolean): Either<false, true> => 
    fromPredicate((x: boolean): x is true => x, x)
    .mapLeftTo(false)

type Nullish = null | undefined;
export const fromNullish = <T>(x: T | Nullish) => fromPredicate(
    (x): x is T => x !== null && x !== undefined,
    x
) as Either<Nullish, T>