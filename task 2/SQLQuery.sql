with SubdivisionHierarchy as (
    select
        c.id as id,
        c.name as name,
        s.name as sub_name,
        s.id as sub_id,
        0 as sub_level,
        c.age
    from
        collaborators c
    join
        subdivisions s on c.subdivision_id = s.id
    where
        c.id = 710253
    union all
    select
        c.id as id,
        c.name as name,
        s.name as sub_name,
        s.id as sub_id,
        sh.sub_level + 1,
        c.age
    from
        SubdivisionHierarchy sh
    join
        subdivisions s on sh.sub_id = s.parent_id
    join
        collaborators c on c.subdivision_id = s.id
)

select
    sh.id,
    sh.name,
    sh.sub_name,
    sh.sub_id,
    sh.sub_level,
    count(*) as colls_count
from
    SubdivisionHierarchy sh
where
    sh.age < 40
    and len(sh.name) > 11
    and sh.sub_id not in (100055, 100059)
group by
    sh.id, sh.name, sh.sub_name, sh.sub_id, sh.sub_level
order by
    sh.sub_level;
