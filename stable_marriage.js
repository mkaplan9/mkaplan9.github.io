// Import csv A of the form Category A,Pref 1,Pref 2,... and analogous for csv B
// Make an object that stores name, category, prefs in order for each person
// Match up according to Miraj algo Gale-Shapley (accomodate no match)
// Output pairs


const csv_a = "" //
const csv_b = ""//

// Convert to objects
let a_objects = ""
let b_objects = ""

a_objects = {
  "1": {
    preference_keys: ["1","2"],
    is_paired: false,
    match: null
  },
  "2": {
    preference_keys: ["2","1"],
    is_paired: false,
    match: null
  }
}

b_objects = {
  "1": {
    preference_keys: ["1","2"],
    is_paired: false,
    match: null
  },
  "2": {
    preference_keys: ["2","1"],
    is_paired: false,
    match: null
  }
}

const is_stable = false
while (!is_stable) {
  Object.keys(a_objects).forEach(function (a_object_key) {
    a_object = a_objects[a_object_key]
    if (!a_object.is_paired) {
      while (!a_object.is_paired) {
        let potential_match_b
        let old_match
        a_object.preference_keys.forEach(function (pref_object_key) {
          potential_match_b = b_objects[pref_object_key]
          if (potential_match_b.prefers(a_object)) {
            old_match_a = potential_match_b.match
            if (old_match) {
              old_match.match = null
              old_match.is_paired = false
            }
            potential_match_b.match = a_object
            potential_match_b.is_paired = true
            a_object.match = potential_match_b
            a_object.is_paired = true
            break
          }
        })
      }
    }
  })
}
