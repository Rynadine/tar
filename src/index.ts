import fs from 'fs';


async function main() {
    await fs.promises.writeFile('.\\test', 'wahhh', {mode: '755'});
    const stat = await fs.promises.stat(`.\\test`);
        console.log(await fs.promises.stat(`.\\test`));

console.log(createHeader({
    chksum: 555,
    devmajor: "Brian",
    devminor: "Craig",
    gid: stat.gid,
    gname: "Botha",
    linkname: "idontknow",
    // magic: "",
    mode: stat.mode,
    mtime: stat.mtimeMs,
    name: "Test",
    prefix: "idontknowprefix",
    size: stat.size,
    typeflag: TypeFlag.REGTYPE,
    uid: stat.uid,
    uname: "Rey",
    // version: ""

}))

}

function pad(
    value: string | number,
    length: number,
    padValue: string,
    end?: string,
): string {
    if (end != null) {
        return value.toString(8).padStart(length - end.length, padValue) + end;
    } else {
        return value.toString(8).padStart(length, padValue);
    }
}

enum TypeFlag {
    REGTYPE = '0',
    AREGTYPE = '\0',
    LNKTYPE = '1',
    SYMTYPE = '2',
    CHRTYPE = '3',
    BLKTYPE = '4',
    DIRTYPE = '5',
    FIFOTYPE = '6',
    CONTTYPE = '7',
}

// struct posix_header
// {                              /* byte offset */
//     char name[100];               /*   0 */
//     char mode[8];                 /* 100 */
//     char uid[8];                  /* 108 */
//     char gid[8];                  /* 116 */
//     char size[12];                /* 124 */
//     char mtime[12];               /* 136 */
//     char chksum[8];               /* 148 */
//     char typeflag;                /* 156 */
//     char linkname[100];           /* 157 */
//     char magic[6];                /* 257 */
//     char version[2];              /* 263 */
//     char uname[32];               /* 265 */
//     char gname[32];               /* 297 */
//     char devmajor[8];             /* 329 */
//     char devminor[8];             /* 337 */
//     char prefix[155];             /* 345 */
//     /* 500 */
// };
function createHeader(
    {
        name,
        mode,
        uid,
        gid,
        size,
        mtime,
        chksum,
        typeflag,
        linkname,
        // magic,
        // version,
        uname,
        gname,
        devmajor,
        devminor,
        prefix,

    }: {
        name: string;
        mode: number;
        uid: number;
        gid: number;
        size: number;
        mtime: number;
        chksum: number;
        typeflag: TypeFlag;
        linkname: string;
        // magic: string;
        // version: string;
        uname: string;
        gname: string;
        devmajor: string;
        devminor: string;
        prefix: string;
    }
):Buffer {
    console.log(name);
    const header = Buffer.alloc(512, 0x00);
    header.write(name, 0, 100, 'ascii');
    header.write(pad(mode, 8, '0', '\0'), 100, 8, 'ascii');
    header.write(pad(uid, 8, '0', '\0'), 108, 8, 'ascii');
    header.write(pad(gid, 8, '0', '\0'), 116, 8, 'ascii');
    header.write(pad(size, 12, '0', '\0'), 124, 12, 'ascii');
    header.write(pad(mtime, 12, '0', '\0'), 136, 12, 'ascii');
    header.write(pad(chksum, 8, '0', '\0'), 148, 8, 'ascii');
    header.write(typeflag, 156, 1, 'ascii');
    header.write(linkname, 157, 100, 'ascii');
    header.write(pad('ustar', 6, '0', '\0'), 257, 6, 'ascii');
    header.write(pad('00', 2, '0', '\0'), 263, 2, 'ascii');
    header.write(uname, 265, 32, 'ascii');
    header.write(gname, 297, 32, 'ascii');
    header.write(pad(devmajor, 8, '0', '\0'), 329, 8, 'ascii');
    header.write(pad(devminor, 8, '0', '\0'), 337, 8, 'ascii');
    header.write(prefix, 345, 155, 'ascii');
    console.log(header);
return header;


}


void main();