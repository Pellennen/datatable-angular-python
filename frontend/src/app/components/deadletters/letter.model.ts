export class Letter {
  constructor(
    public _id?: number,
    public created_at?: Date,
    public topic?: string,
    public partition?: number,
    public offset?: number,
    public timestamp?: number,
    public key?: number,
    public value?: string,
    public decoded_value?: string,
    public headers?: string,
    public checksum?: string,
    public serialized_key_size?: number,
    public serialized_value_size?:number,
    public serialized_header_size?: number,
    public log?: string,
    public schema?: string,
    
  ) { }
}
